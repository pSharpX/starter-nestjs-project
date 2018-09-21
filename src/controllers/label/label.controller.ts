import {Body, Controller, Delete, Dependencies, Get, Inject, Post, Put, ValidationPipe} from '@nestjs/common';
import {LabelRepository} from '../../repositories/label-repository';
import {ILabelService} from '../../services/ilabel.service';
import {Label} from '../../models/label';
import {CreateLabelDto} from '../../dto/create-label-dto';
import {UpdateLabelDto} from '../../dto/update-label-dto';
import {DeleteLabelDto} from '../../dto/delete-label-dto';

@Controller('label')
export class LabelController {
    private service: ILabelService;
    constructor(@Inject('LabelService') service: ILabelService) {
        this.service = service;
    }

    @Get()
    async root(): Promise<Label[]> {
        return await this.service.FindAll();
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) request: CreateLabelDto): Promise<Label> {
        return await this.service.Insert(request.ToLabel());
    }

    @Put()
    async update(@Body() request: UpdateLabelDto): Promise<Label> {
        return await this.service.Update(request.Id, request.ToLabel());
    }

    @Delete()
    async delete(@Body() request: DeleteLabelDto): Promise<Label> {
        return await this.service.Delete(request.Id);
    }
}
