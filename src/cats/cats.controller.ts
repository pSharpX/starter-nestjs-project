import {Controller, Get, Post} from '@nestjs/common';

@Controller('cats')
export class CatsController {

    constructor(){}

    @Get()
    findAll(){
        return 'this actions returns all cats';
    }

    @Post()
    create(){
        return 'this action create a new cat';
    }
}
