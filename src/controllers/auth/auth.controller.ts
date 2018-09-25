import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {IAuthService} from '../../services/auth.generic.service';
import {UserCredential} from '../../models/user-credential';
import {SignUpDto} from '../../dto/sign-up-dto';

@Controller('auth')
export class AuthController {
    private service: IAuthService;
    constructor(@Inject('AuthService') service: IAuthService) {
        this.service = service;
    }

    @Get()
    async root(): Promise<UserCredential[]> {
        return await this.service.findAll();
    }

    @Get(':username')
    async find(@Param('username') username: string): Promise<UserCredential> {
        return await this.service.findByUsername(username);
    }

    @Post()
    async create(@Body() request: SignUpDto): Promise<UserCredential> {
        return await this.service.insert(request.ToUserCredential());
    }
}
