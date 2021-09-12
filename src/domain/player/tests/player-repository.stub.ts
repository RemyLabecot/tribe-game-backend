import {PlayerRepository} from "../repositories/player.repository";
import {Player} from "../models/player";

export class PlayerRepositoryStub implements PlayerRepository {

    async findById(id: number): Promise<Player> {
        return new Player(1, "name", "email", "password");
    }

    async findByMail(email: string): Promise<Player> {
        return new Player(null, "name", "remy@test.fr", "password");
    }

    async save(player: Player): Promise<Player> {
        return new Player(1, "name", "email", "password");
    }
}