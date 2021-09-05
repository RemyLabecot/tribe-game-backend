import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {InvalidPlayerError} from "../../domain/player/invalid-player.error";

@Catch(InvalidPlayerError)
export class InvalidPlayerErrorFilter implements ExceptionFilter {
    catch(exception: InvalidPlayerError, host: ArgumentsHost): void {
        if(exception.message == 'Player with this email already exist') {
            throw new HttpException(exception.message, HttpStatus.CONFLICT);
        } else if(exception.message == 'Wrong password') {
            throw new HttpException(exception.message, HttpStatus.FORBIDDEN);
        } else if (exception.message == "Player with this email/password doesn\'t exist") {
            throw new HttpException(exception.message, HttpStatus.FORBIDDEN);
        }
    }
}