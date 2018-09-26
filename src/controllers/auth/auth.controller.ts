import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {IAuthService} from '../../services/auth.generic.service';
import {UserCredential} from '../../models/user-credential';
import {SignUpDto} from '../../dto/sign-up-dto';
import {IAuthServiceFacade} from '../../services/facades/auth.generic.service.facade';
import {ResponseDto} from '../../dto/response-dto';

@Controller('auth')
export class AuthController {
    private service: IAuthService;
    private serviceFacade: IAuthServiceFacade;
    constructor(
        @Inject('AuthService') service: IAuthService,
        @Inject('AuthServiceFacade') serviceFacade: IAuthServiceFacade) {
        this.service = service;
        this.serviceFacade = serviceFacade;
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
    async create(@Body() request: SignUpDto): Promise<ResponseDto> {
        // return await this.service.insert(request.ToUserCredential());
        return await ((this.serviceFacade.signUp(request) as Promise<boolean>)
            .then((res: boolean) => {
                const response = new ResponseDto();
                response.success = res;
                response.statusCode = (res) ? 200 : 500;
                return new Promise<ResponseDto>((resolve) => resolve(response));
            }));
    }
}
