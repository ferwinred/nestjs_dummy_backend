import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator"
import { Role } from "src/common/enums"

export class RegisterDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(2)
    name: string

    @IsEmail()
    email: string

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string

    @IsEnum(Role)
    role?: Role

}