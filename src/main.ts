import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {useContainer} from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // useContainer(app, {fallbackOnErrors: true});
    useContainer(app.select(AppModule), {fallbackOnErrors: true});
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        // whitelist: true,
        // forbidNonWhitelisted: false,
        // disableErrorMessages: true,
    }));
    await app.listen(3001);
}
bootstrap();
