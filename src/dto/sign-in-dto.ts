import {UserCredential} from '../models/user-credential';
import {IsEmail, IsNotEmpty, IsBoolean, MinLength, MaxLength} from 'class-validator';

export class SignInDto{
    @MaxLength(50)
    @MinLength(3)
    readonly username: string;
    @IsEmail()
    @MaxLength(150)
    readonly email: string;
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    readonly password: string;
    @IsBoolean()
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