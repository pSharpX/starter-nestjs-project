import {MiddlewareConsumer, Module, MulterModule, NestModule, HttpModule} from '@nestjs/common';
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
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth.service';
import {CategoryRepository} from './repositories/category.repository';
import {UserCredentialRepository} from './repositories/user-credential.repository';
import {IsUserAlreadyExistConstraint} from './dto/validators/is-user-already-exist-constraint';
import { AuthServiceFacade } from './services/facades/auth.service.facade';
import {CorsMiddleware} from './middlewares/cors/cors.middleware';
import { ConfigService } from './services/config.service';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Label, Category, Item, Cart, CartDetail, User]),
        MulterModule.register({
            dest: './upload',
        }),
    ],
    controllers: [AppController, CatsController, LabelController, UserController, ItemController, CategoryController, AuthController],
    providers: [
        {provide: ConfigService, useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`)},
        AppService,
        {provide: 'CategoryRepository', useClass: CategoryRepository},
        {provide: 'UserCredentialRepository', useClass: UserCredentialRepository},
        {provide: 'LabelService', useClass: LabelService},
        {provide: 'UserService', useClass: UserService},
        {provide: 'CategoryService', useClass: CategoryService},
        {provide: 'ItemService', useClass: ItemService},
        {provide: 'AuthService', useClass: AuthService},
        {provide: 'AuthServiceFacade', useClass: AuthServiceFacade},
        IsUserAlreadyExistConstraint,
    ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(CorsMiddleware)
            .forRoutes('item');
        //  .forRoutes({ path: 'cats', method: RequestMethod.GET });
        //  .forRoutes({ path: '*', method: RequestMethod.ALL })
        //  .forRoutes(CatsController);
    }
}
