import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { PlayerI } from 'src/player/models/player.interface';
const bcrypt = require ('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    generateJwt(player: PlayerI): Observable<string> {
        return from(this.jwtService.signAsync({player}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(password: string, storedPasswordHash: string): Observable<any> {
        return from(bcrypt.compare(password, storedPasswordHash));
    }
}
