import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { UserService } from 'src/auth/user.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';

/**
 * 
 */
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto: LoginDto) {
        console.log('JwtService AuthService: ', this.jwtService)
        const user = await this.userService.findByEmailWithPassword(loginDto.email);

        if (!user) throw new UnauthorizedException(`Wrong email or password`);

        const isValidPassword = await bcryptjs.compare(loginDto.password, user.password);

        if (!isValidPassword) throw new UnauthorizedException(`Wrong email or password`);

        const payload = {
            email: user.email, 
            role: user.role
        }

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user: user.id,
            role: user.role
        };
    }

    async register({ name, email, password, role }: RegisterDto) {
        
        const user = await this.userService.findByEmailWithPassword(email);

        if (user) throw new BadRequestException(`This Email is already registered`);

        const hashPassword = await bcryptjs.hash(password, 12);

        const newUser = await this.userService.create({
            name,
            email,
            password: hashPassword,
            role
        });

        return newUser;

    }

}
