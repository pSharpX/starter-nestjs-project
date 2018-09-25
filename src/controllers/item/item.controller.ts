import {Body, Controller, Get, Param, Post, ValidationPipe} from '@nestjs/common';
import {IItemService} from '../../services/item.generic.service';
import {Inject} from '@nestjs/common/utils/decorators/inject.decorator';
import {Item} from '../../models/item';
import {CreateItemDto} from '../../dto/create-item-dto';

@Controller('item')
export class ItemController {
    private service: IItemService;
    constructor(@Inject('ItemService') service: IItemService) {
        this.service = service;
    }

    @Get()
    async root(): Promise<Item[]> {
        return await this.service.findAll();
    }

    @Get('search/:term')
    async search(@Param('term') term: string): Promise<Item[]> {
        return await this.service.search(term);
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) request: CreateItemDto): Promise<Item> {
        return await this.service.insert(request.ToLabel());
    }
}
