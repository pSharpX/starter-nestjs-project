import { Injectable } from '@nestjs/common';
import {ILabelService} from './ilabel.service';
import {Label} from '../models/label';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class LabelService implements ILabelService{
    private readonly repository: Repository<Label>;
    constructor(@InjectRepository(Label)
                    repository: Repository<Label>){
        this.repository = repository;
    }

    async FindAll(): Promise<Label[]> {
        return await this.repository.find();
    }

    async Find(code: string): Promise<Label> {
        return await this.repository.findOne({Code: code});
    }

    async Where(label: Label): Promise<Label> {
        return await this.repository.findOne(label);
    }

    async Insert(label: Label): Promise<Label> {
        await this.repository.save(label);
        return label;
    }

    async Update(id: number, label: Label): Promise<Label> {
        try {
            await this.repository.updateById(id, label);
            return label;
        }catch (e){
        }
    }

    async Delete(id: number): Promise<Label> {
        try {
            const toDetele = this.repository.findOneById(id);
            await this.repository.deleteById(id);
            return toDetele;
        }catch (e){
        }
    }
}
