import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from './create-breed.dto';

/**
 * @class UpdateBreedDto
 * 
 */
export class UpdateBreedDto extends PartialType(CreateBreedDto) {}
