import { IsString } from "class-validator";
import { LoginPlayerDto } from "./LoginPlayer.dto";


export class CreatePlayerDto extends LoginPlayerDto {

    @IsString()
    name: string; 
    
}