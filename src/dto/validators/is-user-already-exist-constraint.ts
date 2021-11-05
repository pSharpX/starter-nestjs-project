import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IUserCredentialRepository } from '../../repositories/user-credential.generic.repository';
import { Inject, Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  private readonly repository: IUserCredentialRepository;
  constructor(
    @Inject('UserCredentialRepository')
    repository: IUserCredentialRepository,
  ) {
    this.repository = repository;
  }
  validate(
    userName: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.repository.existUsername(userName).then((user) => {
      if (user) return false;
      return true;
    });
  }
}
