import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
  ){}


  async create(CreateUserDto: CreateUserDto) {

    try {
      
      const user = this.userRepository.create(CreateUserDto);
  
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll({ limit=10, offset=0 }: PaginationDto) {
    return await this.userRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({id});
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByEmailWithPassword(email: string) {
    try {
      
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        }, 
        select: [ 'password', 'id', 'name', 'email', 'role']
      });
  
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
