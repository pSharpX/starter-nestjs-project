
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    Inactive: boolean;
}
