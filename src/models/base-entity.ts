
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    Inactive: boolean;
}
