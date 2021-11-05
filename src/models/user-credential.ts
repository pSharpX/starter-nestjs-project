import { BaseEntity } from './base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('user_credentials')
export class UserCredential extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 50 })
  password: string;
  @Column({ type: 'tinyint', nullable: true, default: false })
  rememberMe: boolean;
  @ManyToOne((type) => User, (user) => user.credentials)
  user: User;
}
