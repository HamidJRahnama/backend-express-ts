import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator"

class LoginDtos{
    @IsDefined()
    @IsEmail()
    email:string

    @IsDefined()
    @MaxLength(16)
    @MinLength(8)
    password:string
}

export default LoginDtos