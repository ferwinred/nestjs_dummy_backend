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

/** 
 * @class
 * This class is a controller for the Breeds module
 * 
*/
@Controller('breeds')
export class BreedsController {

  /**
   * @constructor 
   * 
   * @param breedsService
   * @Inject the BreedsService
   */
  constructor(private readonly breedsService: BreedsService) {}

  @Auth(Role.ADMIN)
  @Post()
  async create(@Body() createBreedDto: CreateBreedDto) {
      return await this.breedsService.create(createBreedDto);
   
  }

  @Auth(Role.USER)
  @Get()
  async findAll() {
    return await this.breedsService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.breedsService.findOne(id);
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
