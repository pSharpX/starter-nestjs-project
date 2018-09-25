import { Injectable } from '@nestjs/common';
import {IItemService} from './item.generic.service';
import {Item} from '../models/item';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class ItemService implements IItemService{
    private readonly repository: Repository<Item>;
    constructor(@InjectRepository(Item)
                    repository: Repository<Item>){
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
        await this.repository.save(entity);
        return entity;
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
}
