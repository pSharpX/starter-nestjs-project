import { Injectable } from '@nestjs/common';
import { ILabelService } from './label.generic.service';
import { Label } from '../models/label';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LabelService implements ILabelService {
  private readonly repository: Repository<Label>;
  constructor(
    @InjectRepository(Label)
    repository: Repository<Label>,
  ) {
    this.repository = repository;
  }
  async findByCode(code: string): Promise<Label> {
    return await this.repository.findOne({ Code: code });
  }

  async findAll(): Promise<Label[]> {
    return await this.repository.find();
  }

  async find(id: number): Promise<Label> {
    return undefined;
  }

  async where(entity: Label): Promise<Label> {
    return await this.repository.findOne(entity);
  }

  async insert(entity: Label): Promise<Label> {
    await this.repository.save(entity);
    return entity;
  }

  async update(id: number, entity: Label): Promise<Label> {
    try {
      await this.repository.update(id, entity);
      return entity;
    } catch (e) {}
  }

  async delete(id: number): Promise<Label> {
    try {
      const toDetele = this.repository.findOne(id);
      await this.repository.delete(id);
      return toDetele;
    } catch (e) {}
  }
}
