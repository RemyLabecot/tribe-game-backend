import {Player} from "../models/player";

export interface PlayerRepository {
    save(player: Player): Promise<Player>;

    findByMail(email: string): Promise<Player>;

    findById(id: number): Promise<Player>;
}