import { Injectable } from '@nestjs/common';
import {IUserService} from './user.generic.service';
import {User} from '../models/user';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UserService implements IUserService{
    private readonly repository: Repository<User>;
    constructor(@InjectRepository(User)
                    repository: Repository<User>){
        this.repository = repository;
    }

    async findByUserName(userName: string): Promise<User> {
        return await this.repository.findOne({userName});
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async find(id: number): Promise<User> {
        return undefined;
    }

    async where(entity: User): Promise<User> {
        return await this.repository.findOne(entity);
    }

    async insert(entity: User): Promise<User> {
        await this.repository.save(entity);
        return entity;
    }

    async update(id: number, entity: User): Promise<User> {
        try {
            await this.repository.update(id, entity);
            return entity;
        }catch (e){
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const toDetele = this.repository.findOne(id);
            await this.repository.delete(id);
            return toDetele;
        }catch (e){
        }
    }
}
