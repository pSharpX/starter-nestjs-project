import { Injectable } from '@nestjs/common';
import { IItemService } from './item.generic.service';
import { Item } from '../models/item';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs/index';
import { AxiosResponse } from 'axios';
import * as cloudinary from 'cloudinary';
import { ConfigService } from './config.service';
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

/*
*
* const cloudName = 'Your cloud name';
const unsignedUploadPreset = 'Your upload preset';

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function(e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

// ************************ Drag and drop ***************** //
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Reset the upload progress bar
   document.getElementById('progress').style.width = 0;

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').style.width = progress + "%";

    console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
  });

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, 'w_150,c_scale');
      var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;
      document.getElementById('gallery').appendChild(img);
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);
}

// *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    uploadFile(files[i]); // call the function to upload the file
  }
};
* */
