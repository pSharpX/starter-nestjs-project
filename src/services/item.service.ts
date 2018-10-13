import {HttpService, Injectable} from '@nestjs/common';
import {IItemService} from './item.generic.service';
import {Item} from '../models/item';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Observable} from 'rxjs/index';
import {AxiosResponse} from '@nestjs/common/http/interfaces/axios.interfaces';
import * as cloudinary from 'cloudinary';

@Injectable()
export class ItemService implements IItemService{
    private readonly repository: Repository<Item>;
    constructor(@InjectRepository(Item)
                    repository: Repository<Item>,
                private readonly httpService: HttpService){
        this.repository = repository;
    }

    async search(term: string): Promise<Item[]> {
        term = '%' + term + '%';
        return await this.repository
            .createQueryBuilder('item')
            .where('item.name like :term', {term})
            .getMany();
    }

    async findByName(name: string): Promise<Item[]> {
        return await this.repository
            .createQueryBuilder('item')
            .where('item.name = :name', {name})
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
        try{
            const res = await this.uploadImageToCloudinary(entity.image, entity);
            entity.imageUrl = res.url;
            entity.image = null;
            console.warn(entity);
            return await this.repository.save(entity);
            // return entity;
        } catch (e){
            throw e;
        }
    }

    async update(id: number, entity: Item): Promise<Item> {
        try {
            await this.repository.update(id, entity);
            return entity;
        }catch (e){
        }
    }

    async delete(id: number): Promise<Item> {
        try {
            const toDetele = this.repository.findOne(id);
            await this.repository.delete(id);
            return toDetele;
        }catch (e){
        }
    }

    uploadImage(): Observable<AxiosResponse<Item[]>> {
        cloudinary.config({
            cloud_name: 'psharpx',
            api_key: '238357997896332',
            api_secret: 'Gxw-uct7UH4i86KXI6JVCRn0GJo',
        });

        return this.httpService.get('http://localhost:3000/item');
    }

    uploadImageToCloudinary(image, item): Promise<any>{
        cloudinary.config({
            cloud_name: 'psharpx',
            api_key: '238357997896332',
            api_secret: 'Gxw-uct7UH4i86KXI6JVCRn0GJo',
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
                        { width: 200, height: 200, crop: 'thumb', gravity: 'face', radius: 20, effect: 'sepia' },
                        { width: 100, height: 150, crop: 'fit', format: 'png' }],
                    tags: ['special', 'sample'],
                },
                (error, result) => {
                    if (result)
                        resolve(result);
                    reject(error);
                });
        });
    }
}
