import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Cat } from './entity/cats.entity';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

    
    constructor( 
        @InjectRepository(Cat)
        private readonly catsRepository: Repository<Cat>,

        @InjectRepository(Breed)
        private readonly breedRepository: Repository<Breed>,
    ){}

    async findAll(){
        return await this.catsRepository.find();
    }

    async findOne(id: string){
        return await this.catsRepository.findOne({
            where: {
                id,
            }
        });
    }

    async create(createCatsDto: CreateCatDto){

        try {
            
            const breed = await this.breedRepository.findOneBy({
                name: createCatsDto.breed 
            });

            if (!breed) throw new NotFoundException(`Cannot find the breed: ${createCatsDto.breed}`);

            const cat = this.catsRepository.create(createCatsDto);
    
            return await this.catsRepository.save(cat);

        } catch (error) {
            return this.handleError(error);
        }
        
    }

    async update(id: string, data: UpdateCatDto){
        // return this.catsRepository.update(id, UpdateCatDto);
    }

    async delete(id: string){
        return this.catsRepository.softDelete(id);
    }

    private handleError(e: any) {

        if(e.code === '23505') throw new BadRequestException(e.detail);
    
        if (e.name === 'NotFoundException') throw new BadRequestException(e.response);
    
        throw new InternalServerErrorException(e);
      }
      
}
