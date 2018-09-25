import {Category} from '../models/category';

export class CreateCategoryDto{
    readonly name: string;
    readonly description: string;

    public ToLabel(): Category{
        const category = new Category();
        category.name = this.name;
        return category;
    }
}