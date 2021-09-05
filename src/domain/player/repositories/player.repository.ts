import {CreatePlayerDto} from "../models/dto/CreatePlayer.dto";
import {Player} from "../models/player";

export interface PlayerRepository {
    save(player: CreatePlayerDto): Promise<Player>;
    findByMail(email: string): Promise<Player>;
    findById(id: number): Promise<Player>;
}