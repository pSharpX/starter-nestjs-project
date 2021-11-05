import { IGenericRepository } from './generic.repository';
import { Category } from '../models/category';

export interface ICategoryRepository
  extends IGenericRepository<Category, number> {
  findByName(name: string): Promise<Category>;
}
