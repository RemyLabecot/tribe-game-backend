import {PlayerRepository} from "../repositories/player.repository";
import {Player} from "../models/player";

export class InvalidPlayerRepositoryStub implements PlayerRepository {

    async findById(id: number): Promise<Player> {
        return null;
    }

    async findByMail(email: string): Promise<Player> {
        return null;
    }

    async save(player: Player): Promise<Player> {
        return new Player(1, "name", "email", "password");
    }
}