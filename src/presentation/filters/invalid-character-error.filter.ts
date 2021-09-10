import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {InvalidCharacterError} from "../../domain/character/invalid-character.error";

@Catch(InvalidCharacterError)
export class InvalidCharacterErrorFilter implements ExceptionFilter {
    catch(exception: InvalidCharacterError, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();
        if(exception.message == 'Player with this email already exist') {
            response.status(409).json({message: exception.message});
        } else {
            response.status(403).json({message: exception.message});
        }
    }
}