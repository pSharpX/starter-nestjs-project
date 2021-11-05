import { EntityRepository, Repository } from 'typeorm';
import { Label } from '../models/label';

@EntityRepository(Label)
export class LabelRepository extends Repository<Label> {}
