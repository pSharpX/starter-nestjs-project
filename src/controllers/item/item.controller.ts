import {
    Body, Controller, FileInterceptor, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import {IItemService} from '../../services/item.generic.service';
import {Inject} from '@nestjs/common/utils/decorators/inject.decorator';
import {Item} from '../../models/item';
import {CreateItemDto} from '../../dto/create-item-dto';
import {UpdateItemDto} from '../../dto/update-item-dto';

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

    @Get('/:id')
    async find(@Param('id') id: number): Promise<Item> {
        return await this.service.find(id);
    }

    @Get('search/:term')
    async search(@Param('term') term: string): Promise<Item[]> {
        return await this.service.search(term);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @UploadedFile() file,
        @Body() request: CreateItemDto,
        @Req() req): Promise<Item> {
        request.image = file;
        return await this.service.insert(request.ToItem());
    }

    @Put()
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @UploadedFile() file,
        @Body() model: UpdateItemDto){
        model.image = file;
        return await this.service.update(model.Id, model.ToItem());
    }
}
