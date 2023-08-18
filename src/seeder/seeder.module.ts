import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';
import { CatsModule } from '../cats/cats.module';
import { CatsService } from '../cats/cats.service';
import { Cat } from '../cats/entity/cats.entity';
import { Breed } from '../breeds/entities/breed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed]),HttpModule, ConfigModule, BreedsModule, JwtModule, CatsModule],
  controllers: [SeederController],
  providers: [SeederService, BreedsService, CatsService]
})
export class SeederModule {}
