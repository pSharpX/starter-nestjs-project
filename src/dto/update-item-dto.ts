import {Item} from '../models/item';
import {Category} from '../models/category';
import {MinLength, IsNotEmpty, MaxLength, IsNumber, IsNumberString} from 'class-validator';

export class UpdateItemDto{
    @IsNumberString()
    readonly Id: number;
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
    image: any;
    readonly categoryId: number;

    public ToItem(): Item{
        const item = new Item();
        item.name = this.name;
        item.description = this.description;
        item.price = this.price;
        item.image = this.image;
        const category = new Category();
        category.Id = this.categoryId;
        item.category = category;
        return item;
    }
}