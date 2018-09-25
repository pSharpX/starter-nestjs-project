import {IGenericRepository} from './generic.repository';
import {UserCredential} from '../models/user-credential';

export interface IUserCredentialRepository extends IGenericRepository<UserCredential, number>{
    existEmail(email: string): Promise<boolean> ;
    existUsername(username: string): Promise<boolean> ;
    findByEmail(email: string): Promise<UserCredential> ;
    findByUsername(username: string): Promise<UserCredential> ;
    findByEmailAndPassword(email: string, password: string): Promise<UserCredential> ;
}