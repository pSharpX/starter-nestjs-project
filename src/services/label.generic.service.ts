import {Label} from '../models/label';
import {IGenericService} from './generic.service';

export interface ILabelService extends IGenericService<Label, number>{
    findByCode(code: string): Promise<Label>;
}