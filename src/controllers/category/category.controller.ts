import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ICategoryService } from '../../services/category.generic.service';
import { Category } from '../../models/category';
import { CreateCategoryDto } from '../../dto/create-category-dto';

@Controller('category')
export class CategoryController {
  private service: ICategoryService;
  constructor(@Inject('CategoryService') service: ICategoryService) {
    this.service = service;
  }

  @Get()
  async root(): Promise<Category[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ transform: true })) request: CreateCategoryDto,
  ): Promise<Category> {
    return await this.service.insert(request.ToLabel());
  }
}
