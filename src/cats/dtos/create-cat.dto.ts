import { IsEmail, IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator"
import { Breed } from "src/breeds/entities/breed.entity"


export class CreateCatDto {

    @IsString()
    @MinLength(2)
    name: string

    @IsInt()
    @IsPositive()
    age: number

    @IsString()
    @IsOptional()
    breed?: string

    @IsEmail()
    @IsOptional()
    userEmail: string
}
