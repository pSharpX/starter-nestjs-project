import { SignInDto } from '../../dto/sign-in-dto';
import { SignUpDto } from '../../dto/sign-up-dto';

export interface IAuthServiceFacade {
  signIn(entity: SignInDto, ...others: any[]): Promise<boolean> | boolean;
  signUp(entity: SignUpDto, ...others: any[]): Promise<boolean> | boolean;
  signOut(): Promise<boolean> | boolean;
}
