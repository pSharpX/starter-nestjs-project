import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { LabelService } from './services/label.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Label} from './models/label';
import { LabelController } from './controllers/label/label.controller';
import {Category} from './models/category';
import {Item} from './models/item';
import {Cart} from './models/cart';
import {CartDetail} from './models/cart-detail';
import {User} from './models/user';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user/user.controller';
import { ItemController } from './controllers/item/item.controller';
import { ItemService } from './services/item.service';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category/category.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Label, Category, Item, Cart, CartDetail, User]),
    ],
    controllers: [AppController, CatsController, LabelController, UserController, ItemController, CategoryController],
    providers: [
        AppService,
        {provide: 'LabelService', useClass: LabelService},
        {provide: 'UserService', useClass: UserService},
        {provide: 'CategoryService', useClass: CategoryService},
        {provide: 'ItemService', useClass: ItemService},
    ],
})
export class AppModule {}
