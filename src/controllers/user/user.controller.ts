import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { IUserService } from '../../services/user.generic.service';
import { User } from '../../models/user';
import { CreateUserDto } from '../../dto/create-user-dto';

@Controller('user')
export class UserController {
  private service: IUserService;
  constructor(@Inject('UserService') service: IUserService) {
    this.service = service;
  }

  @Get()
  async root(): Promise<User[]> {
    return await this.service.findAll();
  }

  @Get(':username')
  async find(@Param('username') username: string): Promise<User> {
    return await this.service.findByUserName(username);
  }

  @Post()
  async create(@Body() request: CreateUserDto): Promise<User> {
    return await this.service.insert(request.ToUser());
  }
}
