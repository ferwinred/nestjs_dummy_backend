import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe, 
  Query,
  UseInterceptors} from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BreedsService } from './breeds.service';
import { CreateBreedDto, UpdateBreedDto } from './dto';
import { Role } from '../common/enums';
import { Auth } from '../common/decorators';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ErrorsInterceptor } from 'src/common/interceptors/error.interceptor';

/** 
 * @class
 * This class is a controller for the Breeds module
 * 
*/

@ApiTags('Breeds')
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor, ResponseInterceptor, ErrorsInterceptor)
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
  async findAll(@Query() pagination: PaginationDto) {
    return await this.breedsService.findAll(pagination);
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
