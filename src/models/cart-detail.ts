import {BaseEntity} from './base-entity';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Item} from './item';
import {Cart} from './cart';

@Entity('cart_details')
export class CartDetail extends BaseEntity{
    @ManyToOne(type => Cart, cart => cart.details)
    cart: Cart;
    @ManyToOne(type => Item, {eager: true})
    @JoinColumn()
    item: Item;
    @Column()
    quantity: number;
    @Column({type: 'decimal'})
    unitPrice: number;
}