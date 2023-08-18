import { Controller, Get } from '@nestjs/common';
import { Auth } from '../common/decorators';
import { Role } from 'src/common/enums';
import { SeederService } from './seeder.service';

/**
 * @class
 * Receives the requests from the client and send them to the service
 * 
 */
@Auth(Role.ADMIN)
@Controller('seeder')
export class SeederController {

    constructor(private readonly seederService: SeederService){}


    /**
     * @method
     * @description receive a request from the client to make a seed for Breed entity and send It to the service
     * 
     */
    @Get('breeds')
    async setBreedSeed(){
        return await this.seederService.setAllBreeds();
    }

    @Get('cats')
    async setCatSeed(){
        
    }

}
