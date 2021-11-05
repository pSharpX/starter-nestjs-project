import { Injectable } from '@nestjs/common';
import { IAuthServiceFacade } from './auth.generic.service.facade';
import { SignInDto } from '../../dto/sign-in-dto';
import { SignUpDto } from '../../dto/sign-up-dto';
import { Transaction, TransactionRepository } from 'typeorm';
import { UserRepository } from '../../repositories/user.repository';
import { UserCredential } from '../../models/user-credential';
import { User } from '../../models/user';
import { UserCredentialRepository } from '../../repositories/user-credential.repository';

@Injectable()
export class AuthServiceFacade implements IAuthServiceFacade {
  signIn(entity: SignInDto): Promise<boolean> | boolean {
    return undefined;
  }

  @Transaction()
  async signUp(
    entity: SignUpDto,
    @TransactionRepository() userRepository: UserRepository,
    @TransactionRepository() userCredentialRepository: UserCredentialRepository,
  ): Promise<boolean> {
    const user: User = entity.ToUser();
    const userCredential: UserCredential = entity.ToUserCredential();
    await userRepository.save(user);
    userCredential.user = user;
    await userCredentialRepository.insert(userCredential);
    return new Promise<boolean>((resolve) => {
      if (userCredential.Id) resolve(true);
      resolve(false);
    });
  }

  signOut(): Promise<boolean> | boolean {
    return undefined;
  }
}
