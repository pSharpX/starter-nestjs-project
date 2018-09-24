import {User} from '../models/user';

export class CreateUserDto{
    readonly userName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly nationality: string;
    readonly birthDate: Date;

    public ToLabel(): User{
        const user = new User();
        user.userName = this.userName;
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.nationality = this.nationality;
        user.birthDate = this.birthDate;
        return user;
    }
}