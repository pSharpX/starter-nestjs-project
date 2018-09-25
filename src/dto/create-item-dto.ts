import {Item} from '../models/item';
import {Category} from '../models/category';
import {MinLength, IsNotEmpty, MaxLength} from 'class-validator';

export class CreateItemDto{
    @IsNotEmpty()
    @MaxLength(100)
    @MinLength(1)
    readonly name: string;
    // @Validate(CustomTextLength, {
    //     message: "Title is too short or long!"
    // })
    // @Validate(CustomTextLength, [3, 20], {
    //     message: "Wrong post title"
    // })
    // @IsLongerThan("title", {
    //     /* you can also use additional validation options, like "groups" in your custom validation decorators. "each" is not supported */
    //     message: "Text must be longer than the title"
    // })
    readonly description: string;
    readonly price: number;
    image: Blob;
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