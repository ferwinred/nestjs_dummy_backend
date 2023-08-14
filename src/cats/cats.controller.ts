/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto } from './dtos';

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService){}

    @Get()
    async findAll(){
        return await this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string){
        return await this.catsService.findOne(id);
    }

    @Post()
    async create(@Body() data: CreateCatDto){
        return await this.catsService.create(data);
    }

    @Patch(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateCatDto){
        return await this.catsService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string){
        return await this.catsService.delete(id);
    }

}
