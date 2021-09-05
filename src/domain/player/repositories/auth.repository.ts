import {Player} from "../models/player";

export interface AuthRepository {
    generateJwt(player: Player): Promise<string>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, storedPasswordHash: string): Promise<any>;
}