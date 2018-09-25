import {Item} from '../models/item';
import {Category} from '../models/category';

export class CreateItemDto{
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly image: any;
    readonly categoryId: number;

    public ToLabel(): Item{
        const user = new Item();
        user.name = this.name;
        user.description = this.description;
        user.price = this.price;
        user.image = this.image;
        const category = new Category();
        category.Id = this.categoryId;
        user.category = category;
        return user;
    }
}