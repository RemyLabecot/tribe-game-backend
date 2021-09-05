import {IsString} from "class-validator";
import {LoginPlayerDto} from "./LoginPlayer.dto";


export class CreatePlayerDto extends LoginPlayerDto {

    @IsString()
    readonly name: string;


    constructor(email: string, password: string, name: string) {
        super(email, password);
        this.name = name;
    }
}