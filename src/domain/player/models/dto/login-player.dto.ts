import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginPlayerDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}