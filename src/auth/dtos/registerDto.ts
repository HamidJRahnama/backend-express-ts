import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator"

class RegisterDto{

    @MaxLength(20)
    @IsDefined()
    name:string

    @IsDefined()
    @IsEmail()
    email:string

    @IsDefined()
    @MaxLength(16)
    @MinLength(8)
    password:string
}

export default RegisterDto