import { User } from '../models/user';
import { IsUserAlreadyExist } from './validators/decorators/is-user-already-exist-constraint.decorator';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsUserAlreadyExist()
  // @IsUserAlreadyExist({
  //     message: "User $value already exists. Choose another name."
  // })
  @IsNotEmpty()
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly nationality: string;
  @IsDate()
  readonly birthDate: Date;

  public ToUser(): User {
    const user = new User();
    user.userName = this.userName;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.nationality = this.nationality;
    user.birthDate = this.birthDate;
    return user;
  }
}
