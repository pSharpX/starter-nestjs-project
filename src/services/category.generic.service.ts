import {IGenericService} from './generic.service';
import {Category} from '../models/category';

export interface ICategoryService extends IGenericService<Category, number>{
}