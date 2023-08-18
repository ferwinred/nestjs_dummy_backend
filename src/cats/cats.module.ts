import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

import { Module } from '@nestjs/common';
import { Cat } from './entity/cats.entity';
import { BreedsModule } from '../breeds/breeds.module';
import { BreedsService } from '../breeds/breeds.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/auth/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule, JwtModule ],
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
  exports: [BreedsService, CatsService]
})
export class CatsModule {}
