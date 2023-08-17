/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { ActiveUser, Auth } from '../common/decorators';
import { Role } from '../common/enums';

@Auth(Role.USER)
@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService){}

    @Get()
    async findAll(@ActiveUser() user: User){
        return await this.catsService.findAll(user);
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string, @ActiveUser() user: User){
        return await this.catsService.findOne(id, user);
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: User){
        return await this.catsService.create(createCatDto, user);
    }

    @Patch(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() UpdateCatDto: UpdateCatDto, @ActiveUser() user: User){
        return await this.catsService.update(id, UpdateCatDto, user);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string, @ActiveUser() user: User){
        return await this.catsService.delete(id, user);
    }

}
