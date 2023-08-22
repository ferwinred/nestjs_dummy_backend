import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import { Breed } from '../breeds/entities/breed.entity';
import { CreateBreedDto } from 'src/breeds/dto';
import { ResponseBreedApi } from 'src/common/interfaces';
import { BreedsService } from 'src/breeds/breeds.service';
import { CatsService } from 'src/cats/cats.service';


@Injectable()
export class SeederService {
    
    /**
     * @property {array}
     */
    private breeds: Breed[];

    constructor(
        private readonly httpService: HttpService,
        private readonly breedsService: BreedsService,
        private readonly catsService: CatsService
    ){}

    /**
     * @method 
     * @description Save the seeds of the Breeds Entities
     * 
     */
    async setAllBreeds(){

        const apiResponse = await this.apiRequestBreeds();

        const breeds = this.mappingBreeds(apiResponse);

        return await this.breedsService.bulkCreate(breeds);

    }

    async setAllCats(){
        return await this.catsService.bulkCreate();
    }

    private async apiRequestBreeds(){

        let response: ResponseBreedApi[] = [];
        const familyFriendlyArray = [1, 2, 3, 4, 5]
        const offsetIterate = [0, 20]
        
        for (const value of familyFriendlyArray) {
           

                for (const offset of offsetIterate){

                    console.log('Offset: ', offset, offsetIterate)
                    const url2 = `https://api.api-ninjas.com/v1/cats?family_friendly=${value}&offset=${offset}`

                    const { data: breeds }: { data: ResponseBreedApi[]} = await firstValueFrom(
                        this.httpService.get(url2, {
                            headers: {
                                'X-Api-Key': `${process.env.API_KEY}`,
                                'Content-Type': 'application/json',
                            }
                        }).pipe(
                            catchError((error: AxiosError) => {
                                console.error(error);
                              throw 'An error happened!';
                            })
                        )
                    )

                    response = [...response, ...breeds]


                    if (breeds.length < 20) break;

                }

        }
           
        return response;
        
    }

    private mappingBreeds(response: ResponseBreedApi[]) {
        const breeds: CreateBreedDto[] =  response.map((breed) => {
            return {
                name: breed.name,
                maxLife: breed.max_life_expectancy,
                minLife: breed.min_life_expectancy,
                maxWeight: breed.max_weight,
                minWeight: breed.min_weight,
                origin: breed.origin,
                playfulness: breed.playfulness || 1,
                familyFriendly: breed.family_friendly || 1,
                childrenFriendly: breed.children_friendly || 1,
                otherPetsFriendly: breed.other_pets_friendly || 1,
                length: breed.length,
                image: breed.image_link,
            }
        })

        return breeds;
    }

}
