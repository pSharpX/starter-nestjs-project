import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {User} from './user';
import {CartDetail} from "./cart-detail";
import {BaseEntity} from "./base-entity";

@Entity('carts')
export class Cart extends BaseEntity{
    @Column()
    createdDate: Date;
    @Column()
    modifiedDate: Date;
    @Column()
    purchaseDate: Date;
    @Column({length: 300})
    shippingAddress: string;
    @ManyToOne(type => User, user => user.carts)
    user: User;
    @OneToMany(type => CartDetail, details => details.cart)
    details: CartDetail;
    @Column({type: 'decimal'})
    total: number;
}