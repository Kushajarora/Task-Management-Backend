import {IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDetailsDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    userID: string;

    @IsString()
    @IsNotEmpty()
    password: string;   

    @IsString()
    @IsNotEmpty()
    mpin: string

}

export class VerifyUserDto{
    @IsString()
    @IsNotEmpty()
    userID: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class PasswordResetDto{
    @IsString()
    @IsNotEmpty()
    userID: string;

    @IsString()
    @IsNotEmpty()
    newpassword: string;

    @IsString()
    @IsNotEmpty()
    mpin: string;
}

