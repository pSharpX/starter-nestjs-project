import {UserCredential} from '../models/user-credential';
import {IGenericService} from './generic.service';

export interface IAuthService  extends IGenericService<UserCredential, number>{
    existEmail(email: string): Promise<boolean> ;
    existUsername(username: string): Promise<boolean> ;
    findByEmail(email: string): Promise<UserCredential> ;
    findByUsername(username: string): Promise<UserCredential> ;
    findByEmailAndPassword(email: string, password: string): Promise<UserCredential> ;
}