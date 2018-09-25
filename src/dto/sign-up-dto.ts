import {UserCredential} from '../models/user-credential';
import {IsEmail, IsNotEmpty, IsBoolean, MinLength, MaxLength, IsOptional} from 'class-validator';
import {IsUserAlreadyExist} from './validators/decorators/is-user-already-exist-constraint.decorator';

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
    public ToUserCredential(): UserCredential{
        const credential = new UserCredential();
        credential.username = this.username;
        credential.email = this.email;
        credential.password = this.password;
        credential.rememberMe = this.rememberMe;
        return credential;
    }
}