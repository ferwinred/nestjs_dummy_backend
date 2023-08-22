import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Role } from '../common/enums';
import { ActiveUser, Auth } from '../common/decorators';
import { User } from '../common/interfaces';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        return await this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto ){
        return await this.authService.register(registerDto);
    }
    
}
