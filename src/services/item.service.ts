import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IItemService } from './item.generic.service';
import { Item } from '../models/item';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs/index';
import { AxiosResponse } from 'axios';
import * as cloudinary from 'cloudinary';
import * as FormData from 'form-data';

@Injectable()
export class ItemService implements IItemService {
  private readonly repository: Repository<Item>;
  constructor(
    @InjectRepository(Item)
    repository: Repository<Item>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.repository = repository;
  }

  async search(term: string): Promise<Item[]> {
    term = '%' + term + '%';
    return await this.repository
      .createQueryBuilder('item')
      .where('item.name like :term', { term })
      .getMany();
  }

  async findByName(name: string): Promise<Item[]> {
    return await this.repository
      .createQueryBuilder('item')
      .where('item.name = :name', { name })
      .getMany();
  }

  async findAll(): Promise<Item[]> {
    return await this.repository.find();
  }

  async find(id: number): Promise<Item> {
    return await this.repository.findOne(id);
  }

  async where(entity: Item): Promise<Item> {
    return await this.repository.findOne(entity);
  }

  async insert(entity: Item): Promise<Item> {
    try {
      const res = await this.uploadImageToCloudinary(entity.image);
      // const res = await this.uploadImage(entity.image).toPromise();
      entity.imageUrl = res.url;
      entity.image = null;
      // console.warn(entity.image.buffer);
      return await this.repository.save(entity);
      // return entity;
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, entity: Item): Promise<Item> {
    try {
      const res = await this.uploadImageToCloudinary(entity.image);
      entity.imageUrl = res.url;
      entity.image = null;
      await this.repository.update(id, entity);
      return entity;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: number): Promise<Item> {
    try {
      const toDetele = this.repository.findOne(id);
      await this.repository.delete(id);
      return toDetele;
    } catch (e) {}
  }

  uploadImage(image): Observable<AxiosResponse<Item[]>> {
    const cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME');
    const unsignedDevelopmentUploadPreset = this.configService.get(
      'CLOUDINARY_DEVELOPMENT_UPLOAD_PRESET',
    );
    const formData = new FormData();
    formData.append('upload_preset', unsignedDevelopmentUploadPreset);
    formData.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    formData.append('file', image);
    return this.httpService.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  uploadImageToCloudinary(image): Promise<any> {
    const cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get('CLOUDINARY_API_SECRET');
    cloudinary.v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    return new Promise<any>((resolve, reject) => {
      // req.files.myImage.path,
      cloudinary.v2.uploader.upload(
        image.path,
        {
          // public_id: 'development/sample_id',
          folder: 'development',
          user_filename: true,
          crop: 'limit',
          width: 512,
          height: 512,
          eager: [
            {
              width: 200,
              height: 200,
              crop: 'thumb',
              gravity: 'face',
              radius: 20,
              effect: 'sepia',
            },
            { width: 100, height: 150, crop: 'fit', format: 'png' },
          ],
          tags: ['special', 'sample'],
        },
        (error, result) => {
          if (result) resolve(result);
          reject(error);
        },
      );
    });
  }
}
