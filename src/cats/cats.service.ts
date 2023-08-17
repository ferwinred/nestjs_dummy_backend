import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Cat } from './entity/cats.entity';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { Breed } from '../breeds/entities/breed.entity';
import { Role } from '../common/enums';

@Injectable()
export class CatsService {

    
    constructor( 
        @InjectRepository(Cat)
        private readonly catsRepository: Repository<Cat>,

        @InjectRepository(Breed)
        private readonly breedRepository: Repository<Breed>,
    ){}

    async findAll(user: User){
        if (user.role === Role.ADMIN) return await this.catsRepository.find();

        return await this.catsRepository.find({
            where: {
                userEmail: user.email
            }
        });
    }

    async findOne(id: string, user: User){

        const cat = await this.catsRepository.findOneBy({id})

        if (!cat) throw new NotFoundException(`Cat not found`)

        this.validateOwnership(cat, user) 
        
        return cat;
    }


    async create(createCatsDto: CreateCatDto, user: User){

        try {

            const breed = await this.breedRepository.findOneBy({
                name: createCatsDto.breed 
            });

            await this.validateBreed(breed);
            
            createCatsDto.userEmail = user.email;

            const cat = this.catsRepository.create(createCatsDto);

            return await this.catsRepository.save(cat);

        } catch (error) {
            return this.handleError(error);
        }
        
    }

    async update(id: string, updateCatDto: UpdateCatDto, user: User) {

        let breed: Breed;
        const cat = await this.findOne(id, user);

        if (updateCatDto.breed){ 
            breed = await this.breedRepository.findOneBy({ name: updateCatDto.breed })
            
            await this.validateBreed(breed);

        }

        const catToUpdate = {...updateCatDto, id: cat.id, userEmail: user.email}

        const newCat = await this.catsRepository.preload(catToUpdate);

        return this.catsRepository.save(newCat);
    }

    async delete(id: string, user: User) {

        await this.findOne(id, user);

        return this.catsRepository.softDelete(id);
    }

    private handleError(e: any) {

        if(e.code === '23505') throw new BadRequestException(e.detail);
    
        if (e.name === 'NotFoundException') throw new BadRequestException(e.response);
    
        throw new InternalServerErrorException(e);
      }

    private validateOwnership(cat: Cat, user: User) {
        if (user.role !== Role.ADMIN && cat.userEmail !== user.email) throw new UnauthorizedException(`Not authorized`)
    } 

    private async validateBreed(breed: Breed){
        if (!breed) throw new NotFoundException(`Cannot find the breed`);
    }
      
}
