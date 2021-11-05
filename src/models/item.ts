import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base-entity';
import { Category } from './category';

@Entity('items')
export class Item extends BaseEntity {
  @Column({ length: 100 })
  name: string;
  @Column({ length: 500 })
  description: string;
  @Column({ type: 'decimal' })
  price: number;
  @Column({ type: 'blob', nullable: true })
  image: any;
  @Column({ length: 500, nullable: true })
  imageUrl: string;
  @ManyToOne((type) => Category, (category) => category.items, { eager: true })
  category: Category;
}
