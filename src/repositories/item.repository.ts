import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../models/item';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}
