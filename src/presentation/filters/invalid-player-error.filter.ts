import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {InvalidPlayerError} from "../../domain/player/invalid-player.error";

@Catch(InvalidPlayerError)
export class InvalidPlayerErrorFilter implements ExceptionFilter {
    catch(exception: InvalidPlayerError, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();
        if (exception.message == 'Player with this email already exist') {
            response.status(409).json({message: exception.message});
        } else {
            response.status(403).json({message: exception.message});
        }
    }
}