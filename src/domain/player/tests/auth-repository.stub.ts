import {AuthRepository} from "../repositories/auth.repository";
import {Player} from "../models/player";

export class AuthRepositoryStub implements AuthRepository {
    async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return false;
    }

    async generateJwt(player: Player): Promise<string> {
        return "jwt";
    }

    async hashPassword(password: string): Promise<string> {
        return "password";
    }
}