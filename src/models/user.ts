import { BaseEntity } from './base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Cart } from './cart';
import { UserCredential } from './user-credential';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 50, unique: true })
  userName: string;
  @Column({ length: 100 })
  firstName: string;
  @Column({ length: 100 })
  lastName: string;
  @Column({ length: 100 })
  nationality: string;
  @Column()
  birthDate: Date;
  @OneToMany((type) => Cart, (cart) => cart.user)
  carts: Promise<Cart[]>;
  // @OneToMany(type => UserCredential, credentials => credentials.user, {eager: true})
  @OneToMany((type) => UserCredential, (credentials) => credentials.user)
  credentials: UserCredential[];
}
