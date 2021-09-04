import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginPlayerDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}