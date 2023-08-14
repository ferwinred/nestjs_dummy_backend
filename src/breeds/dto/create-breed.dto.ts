import { IsString, MinLength } from "class-validator";

export class CreateBreedDto {

    @IsString()
    @MinLength(4)
    name: string;

    

}
