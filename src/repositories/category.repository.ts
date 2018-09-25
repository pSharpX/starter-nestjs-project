import {EntityManager, EntityRepository} from 'typeorm';
import {ICategoryRepository} from './category.generic.repository';
import {Category} from '../models/category';

@EntityRepository()
export class CategoryRepository implements ICategoryRepository{
    constructor(private manager: EntityManager){
    }
    async findByName(name: string): Promise<Category> {
        return await this.manager.createQueryBuilder()
            .select()
            .from(Category, 'category')
            .where('category.name = :name', {name})
            .getOne();
    }

    async findAll(): Promise<Category[]> {
        return this.manager.find(Category);
    }

    async find(id: number): Promise<Category> {
        return await this.manager.findOne(Category, id);
    }

    async where(entity: Category): Promise<Category> {
        return await this.manager.findOne(Category, entity);
    }

    async insert(entity: Category): Promise<Category> {
        return await this.manager.save(Category, entity);
    }

    async update(id: number, entity: Category): Promise<Category> {
        await this.manager.update(Category, id, entity);
        return entity;
    }

    async delete(id: number): Promise<Category> {
        const toDetele = this.manager.findOne(Category, id);
        await this.manager.delete(Category, id);
        return toDetele;
    }
}