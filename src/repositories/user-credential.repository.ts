import { IUserCredentialRepository } from './user-credential.generic.repository';
import { UserCredential } from '../models/user-credential';
import { EntityManager, EntityRepository } from 'typeorm';

@EntityRepository()
export class UserCredentialRepository implements IUserCredentialRepository {
  constructor(private manager: EntityManager) {}

  async existEmail(email: string): Promise<boolean> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(UserCredential, 'user_credential')
      .where('user_credential.email = :email', { email })
      .getCount()
      .then((count: number) => {
        return count > 0;
      });
  }

  async existUsername(username: string): Promise<boolean> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(UserCredential, 'user_credential')
      .where('user_credential.username = :username', { username })
      .getCount()
      .then((count: number) => {
        return count > 0;
      });
  }

  async findByEmail(email: string): Promise<UserCredential> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(UserCredential, 'user_credential')
      .where('user_credential.email = :email', { email })
      .getOne();
  }

  async findByUsername(username: string): Promise<UserCredential> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(UserCredential, 'user_credential')
      .where('user_credential.username = :username', { username })
      .getOne();
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return await this.manager
      .createQueryBuilder()
      .select()
      .from(UserCredential, 'user_credential')
      .where(
        'user_credential.email = :email AND user_credential.password = :password',
        { email, password },
      )
      .getOne();
  }

  async findAll(): Promise<UserCredential[]> {
    return this.manager.find(UserCredential);
  }

  async find(id: number): Promise<UserCredential> {
    return await this.manager.findOne(UserCredential, id);
  }

  async where(entity: UserCredential): Promise<UserCredential> {
    return await this.manager.findOne(UserCredential, entity);
  }

  async insert(entity: UserCredential): Promise<UserCredential> {
    return await this.manager.save(UserCredential, entity);
  }

  async update(id: number, entity: UserCredential): Promise<UserCredential> {
    await this.manager.update(UserCredential, id, entity);
    return entity;
  }

  async delete(id: number): Promise<UserCredential> {
    const toDetele = this.manager.findOne(UserCredential, id);
    await this.manager.delete(UserCredential, id);
    return toDetele;
  }
}
