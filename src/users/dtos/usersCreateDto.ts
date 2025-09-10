import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

class UsersCreateDto {
    @MaxLength(50)
    @IsDefined()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(20)
    @IsDefined()
    password: string;
}

export default UsersCreateDto;
