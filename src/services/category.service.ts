import { Inject, Injectable } from '@nestjs/common';
import { ICategoryService } from './category.generic.service';
import { Category } from '../models/category';
import { ICategoryRepository } from '../repositories/category.generic.repository';

@Injectable()
export class CategoryService implements ICategoryService {
  private readonly repository: ICategoryRepository;
  constructor(
    @Inject('CategoryRepository')
    repository: ICategoryRepository,
  ) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  async find(id: number): Promise<Category> {
    return await this.repository.find(id);
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findByName(name);
  }

  async where(entity: Category): Promise<Category> {
    return await this.repository.where(entity);
  }

  async insert(entity: Category): Promise<Category> {
    return await this.repository.insert(entity);
  }

  async update(id: number, entity: Category): Promise<Category> {
    return await this.repository.update(id, entity);
  }

  async delete(id: number): Promise<Category> {
    return await this.repository.delete(id);
  }
}
