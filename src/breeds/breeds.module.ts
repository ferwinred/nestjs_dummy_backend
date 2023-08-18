import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { JwtModule } from '@nestjs/jwt';

/**
 * @class BreedsModule
 * This class has the imports, exports, providers and controllers setting for breeds
 */
@Module({
  imports: [TypeOrmModule.forFeature([Breed]), JwtModule],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule]
})
export class BreedsModule {}
