import {Body, Controller, Delete, Get, Inject, Param, Post, Put, ValidationPipe} from '@nestjs/common';
import {ILabelService} from '../../services/label.generic.service';
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
        return await this.service.findAll();
    }

    @Get(':code')
    async find(@Param('code') code: string): Promise<Label> {
        return await this.service.findByCode(code);
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) request: CreateLabelDto): Promise<Label> {
        return await this.service.insert(request.ToLabel());
    }

    @Put()
    async update(@Body(new ValidationPipe({transform: true})) request: UpdateLabelDto): Promise<Label> {
        return await this.service.update(request.Id, request.ToLabel());
    }

    @Delete()
    async delete(@Body(new ValidationPipe({transform: true})) request: DeleteLabelDto): Promise<Label> {
        return await this.service.delete(request.Id);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number): Promise<Label> {
        return await this.service.delete(id);
    }
}