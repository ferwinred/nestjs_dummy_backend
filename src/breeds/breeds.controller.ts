import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe } from '@nestjs/common';

import { BreedsService } from './breeds.service';
import { CreateBreedDto, UpdateBreedDto } from './dto';
import { Role } from 'src/common/enums';
import { Auth } from 'src/common/decorators';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createBreedDto: CreateBreedDto) {
      return this.breedsService.create(createBreedDto);
   
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.breedsService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.breedsService.findOne(id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateBreedDto: UpdateBreedDto) {
    return this.breedsService.update(id, updateBreedDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.breedsService.remove(id);
  }

}
