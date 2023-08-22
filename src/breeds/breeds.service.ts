import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBreedDto, UpdateBreedDto } from './dto';
import { Breed } from './entities/breed.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/** 
 * @class 
 * This class is a service that has the logic for the Breeds module
 * 
 * 
*/
@Injectable()
export class BreedsService {

  /**
   * 
   * @param breedRepository 
   * @inject the breedRepository
   */

  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  /**
   * @method
   * @description This method create a new Breed 
   * 
   * @param createBreedDto
   * The new Breed to create
   * 
   */
  async create(createBreedDto: CreateBreedDto): Promise<CreateBreedDto & Breed> {
    try {
      return await this.breedRepository.save(createBreedDto);
    } catch (error) {
      console.error(error.code);
      return this.handleError(error);
    }
  }

  /**
   * @method
   * @description create a group of Breeds given through an array
   * 
   * @param breedsToCreate 
   * An array of Breed to create
   * 
   */
  async bulkCreate(breedsToCreate: CreateBreedDto[]): Promise<CreateBreedDto[]>{

    return this.breedRepository.save(breedsToCreate);

  }

  /**
   * @method
   * @description This method return all the Breeds
   * 
   */
  async findAll( { limit=10, offset=0}: PaginationDto ): Promise<Breed[]> {
    return await this.breedRepository.find({
      take: limit,
      skip: offset
    });
  }

  /**
   * @method
   * @description Find the unique Breed with an specific Id
   * 
   * @param id 
   * Id of the Breed to search
   */
  async findOne(id: string) {
    const breed = await this.breedRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!breed) throw new NotFoundException(`Could not found any breed with Id ${id}`);

    return breed;

  }

  /**
   * @method
   * @description Search and Modify a Breed of the Id given
   * 
   * @param id 
   * Id of the Breed to search and modify
   */
  async update(id: string, updateBreedDto: UpdateBreedDto) {
    try {
      
      const breed = await this.breedRepository.update(id, updateBreedDto);

      if (breed.affected !== 1) throw new NotFoundException(`Could not found any Breed with Id ${id}`); 
      
      return breed;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * @method
   * @description Make a logical delete to the Breed of the Id given
   * 
   * @param id 
   * Id of the Breed to delete
   */
  async remove(id: string) {
    return await this.breedRepository.softDelete(id);
  }

  /**
   * @method
   * @description Handle all the errors of the method
   * 
   * @param error 
   * error to manage
   */
  private handleError(error: any) {

    if(error.code === '23505') throw new BadRequestException(error.detail);

    if (error.name === 'NotFoundException') return error.response;

    throw new InternalServerErrorException(error);
  }
}
