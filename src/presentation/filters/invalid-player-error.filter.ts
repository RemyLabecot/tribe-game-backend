import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {InvalidPlayerError} from "../../domain/player/invalid-player.error";

@Catch(InvalidPlayerError)
export class InvalidPlayerErrorFilter implements ExceptionFilter {
    catch(exception: InvalidPlayerError, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse();
        if (exception.message == 'Not enough skill points') {
            response.status(403).json({message: exception.message});
        }
    }
}