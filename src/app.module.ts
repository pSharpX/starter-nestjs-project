import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { LabelService } from './services/label.service';
import {DependencyInstaller} from './infrastructure/dependency-installer';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Label} from './models/label';
import { LabelController } from './controllers/label/label.controller';


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Label]),
    ],
    controllers: [AppController, CatsController, LabelController],
    providers: [
        AppService,
        {provide: 'LabelService', useClass: LabelService},
    ],
    components: DependencyInstaller.Installers,
})
export class AppModule {}
