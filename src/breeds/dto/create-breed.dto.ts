import { IsNumber, IsString, IsUrl, Max, Min, MinLength } from "class-validator";

/**
 * @class CreateBreedDto
 */
export class CreateBreedDto {

    /** @member {string}  name - The breed's name */
    @IsString()
    @MinLength(4)
    name: string;

    /** @member {string}  decription - The breed's description */
    @IsString()
    @MinLength(40)
    description?: string;

    /** @member {string}  origin - The breed's origin */
    @IsString()
    @MinLength(3)
    origin: string;

     /** @member {string}  maxLife - The breed's Max Life Expectancy in years  */
    @IsNumber()
    @Min(10)
    @Max(25)
    maxLife: number;

    /** @member {number}  minLife - The breed's Min Life Expectancy in years */
    @IsNumber()
    @Min(8)
    @Max(12)
    minLife: number;

    /** @member {number}  minLife - The breed's Max weight in pounds*/ 
     @IsNumber()
     @Max(15)
     @Min(3)
    maxWeight: number;

     /** @member {number}  minLife - The breed's Min weight in pounds*/ 
     @IsNumber()
     @Min(2)
     @Max(8)
    minWeight: number;

    /** @member {number}  playfulness - The breed's playfulness rating*/ 
    @IsNumber()
    @Max(5)
    @Min(1)
    playfulness: number;

    /** @member {number}  familyFriendly - The breed's family friendly rating*/ 
    @IsNumber()
    @Max(5)
    @Min(1)
    familyFriendly: number;

    /** @member {number}  otherPetsFriendly - The breed's other pets friendly rating*/ 
    @IsNumber()
    @Max(5)
    @Min(1)
    otherPetsFriendly: number;

    /** @member {number}  childrenFriendly - The breed's children friendly rating*/ 
    @IsNumber()
    @Max(5)
    @Min(1)
    childrenFriendly: number; 

     /** @member {string}  length - The breed's length in varying types */
     @IsString()
     @MinLength(4)
    length: string;

    /** @member {string}  image - The breed's image url */
    @IsUrl()
    image: string;

}
