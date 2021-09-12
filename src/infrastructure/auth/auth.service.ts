import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Player} from 'src/domain/player/models/player';
import {AuthRepository} from "../../domain/player/repositories/auth.repository";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService implements AuthRepository {

    constructor(private readonly jwtService: JwtService) {
    }

    generateJwt(player: Player): Promise<string> {
        return this.jwtService.signAsync({player});
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedPasswordHash);
    }
}
