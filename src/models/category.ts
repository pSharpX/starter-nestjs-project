import { BaseEntity } from './base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Item } from './item';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ length: 200 })
  name: string;
  @OneToMany((type) => Item, (item) => item.category)
  items: Item[];
}
