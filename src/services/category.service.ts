import { Injectable } from '@nestjs/common';
import {ICategoryService} from './category.generic.service';
import {Category} from '../models/category';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class CategoryService implements ICategoryService{
    private readonly repository: Repository<Category>;
    constructor(@InjectRepository(Category)
                    repository: Repository<Category>){
        this.repository = repository;
    }

    async findAll(): Promise<Category[]> {
        return await this.repository.find();
    }

    async find(id: number): Promise<Category> {
        return await this.repository.findOne(id);
    }

    async where(entity: Category): Promise<Category> {
        return await this.repository.findOne(entity);
    }

    async insert(entity: Category): Promise<Category> {
        await this.repository.save(entity);
        return entity;
    }

    async update(id: number, entity: Category): Promise<Category> {
        try {
            await this.repository.update(id, entity);
            return entity;
        }catch (e){
        }
    }

    async delete(id: number): Promise<Category> {
        try {
            const toDetele = this.repository.findOne(id);
            await this.repository.delete(id);
            return toDetele;
        }catch (e){
        }
    }
}
