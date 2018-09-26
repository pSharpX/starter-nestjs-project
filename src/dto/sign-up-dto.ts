import {UserCredential} from '../models/user-credential';
import {
    IsEmail, IsNotEmpty, IsBoolean, MinLength, MaxLength, IsOptional, IsDate, IsDateString,
    IsAlpha
} from 'class-validator';
import {IsUserAlreadyExist} from './validators/decorators/is-user-already-exist-constraint.decorator';
import {User} from '../models/user';

export class SignUpDto{
    @MaxLength(50)
    @MinLength(3)
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another name.',
    })
    readonly username: string;
    @IsEmail()
    @MaxLength(150)
    readonly email: string;
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    readonly password: string;
    @IsBoolean()
    @IsOptional()
    readonly rememberMe: boolean;
    @IsNotEmpty()
    readonly firstName: string;
    @IsNotEmpty()
    readonly lastName: string;
    @IsNotEmpty()
    @IsAlpha()
    readonly nationality: string;
    @IsDateString()
    readonly birthDate: Date;
    public ToUserCredential(): UserCredential{
        const credential = new UserCredential();
        credential.username = this.username;
        credential.email = this.email;
        credential.password = this.password;
        credential.rememberMe = this.rememberMe;
        return credential;
    }

    public ToUser(): User{
        const user = new User();
        user.userName = this.username;
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.nationality = this.nationality;
        user.birthDate = this.birthDate;
        return user;
    }
}