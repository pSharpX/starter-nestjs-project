import {IGenericService} from './generic.service';
import {User} from '../models/user';

export interface IUserService extends IGenericService<User, number>{
    findByUserName(userName: string): Promise<User>;
}