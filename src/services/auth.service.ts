import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.generic.service';
import { IUserCredentialRepository } from '../repositories/user-credential.generic.repository';
import { UserCredential } from '../models/user-credential';

@Injectable()
export class AuthService implements IAuthService {
  private readonly repository: IUserCredentialRepository;
  constructor(
    @Inject('UserCredentialRepository')
    repository: IUserCredentialRepository,
  ) {
    this.repository = repository;
  }
  async existEmail(email: string): Promise<boolean> {
    return await this.repository.existEmail(email);
  }

  async existUsername(username: string): Promise<boolean> {
    return await this.repository.existUsername(username);
  }

  async findByEmail(email: string): Promise<UserCredential> {
    return await this.repository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<UserCredential> {
    return await this.repository.findByUsername(username);
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return await this.repository.findByEmailAndPassword(email, password);
  }

  async findAll(): Promise<UserCredential[]> {
    return await this.repository.findAll();
  }

  async find(id: number): Promise<UserCredential> {
    return await this.repository.find(id);
  }

  async where(entity: UserCredential): Promise<UserCredential> {
    return await this.repository.where(entity);
  }

  async insert(entity: UserCredential): Promise<UserCredential> {
    return await this.repository.insert(entity);
  }

  async update(id: number, entity: UserCredential): Promise<UserCredential> {
    return await this.repository.update(id, entity);
  }

  async delete(id: number): Promise<UserCredential> {
    return await this.repository.delete(id);
  }
}
