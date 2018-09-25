import {IGenericService} from './generic.service';
import {Item} from '../models/item';

export interface IItemService extends IGenericService<Item, number>{
    search(term: string): Promise<Item[]>;
    findByName(name: string): Promise<Item[]>;
}