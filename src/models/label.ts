import {Column, Entity} from 'typeorm';
import {BaseEntity} from './base-entity';

@Entity()
export class Label extends BaseEntity{
    @Column({length: 300})
    Code: string;
    @Column({length: 3})
    IsoCode: string;
    @Column()
    Content: string;
}
