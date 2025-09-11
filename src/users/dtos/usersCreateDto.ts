import { 
    IsArray, IsDefined, IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength, IsEnum, IsDateString 
} from "class-validator";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MODERATOR = "moderator"
}

class UsersCreateDto {
    @MaxLength(50)
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsDefined()
    email: string;

    @MinLength(8)
    @MaxLength(20)
    @IsDefined()
    password: string;

    @IsOptional()
    age: number;

    // @IsArray()
    // @IsOptional()
    // skills: string[];

    // @IsOptional()
    // @IsEnum(UserRole)
    // role?: UserRole; 

    // @IsOptional()
    // @IsDateString()
    // dateOfBirth?: string; 

    // @IsOptional()
    // @IsNotEmpty()
    // avatarUrl?: string; 

    // @IsOptional()
    // @IsNotEmpty()
    // bio?: string; 
}

export default UsersCreateDto;
