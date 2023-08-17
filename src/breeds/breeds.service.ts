import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBreedDto, UpdateBreedDto } from './dto';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

 
  async create(createBreedDto: CreateBreedDto) {
    try {
      return await this.breedRepository.save(createBreedDto);
    } catch (error) {
      console.error(error.code);
      return this.handleError(error);
    }
  }


  async findAll() {
    return await this.breedRepository.find();
  }

 
  async findOne(id: string) {
    const breed = await this.breedRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!breed) throw new NotFoundException(`Could not found any breed with Id ${id}`);

    return breed;

  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    try {
      
      const breed = await this.breedRepository.update(id, updateBreedDto);

      if (breed.affected !== 1) throw new NotFoundException(`Could not found any Breed with Id ${id}`); 
      
    } catch (error) {
      return this.handleError(error);
    }
  }


  async remove(id: string) {
    return await this.breedRepository.softDelete(id);
  }

  private handleError(e: any) {

    if(e.code === '23505') throw new BadRequestException(e.detail);

    if (e.name === 'NotFoundException') return e.response;

    throw new InternalServerErrorException(e);
  }
}
