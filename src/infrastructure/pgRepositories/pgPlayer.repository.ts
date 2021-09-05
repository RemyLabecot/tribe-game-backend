import {Injectable} from "@nestjs/common";
import {PlayerRepository} from "../../domain/player/repositories/player.repository";
import {InjectRepository} from '@nestjs/typeorm';
import {PlayerEntity} from "../entities/player.entity";
import {Repository} from "typeorm";
import {CreatePlayerDto} from "../../domain/player/models/dto/CreatePlayer.dto";
import {Player} from "../../domain/player/models/player";

@Injectable()
export class PgPlayerRepository implements PlayerRepository {

    constructor(@InjectRepository(PlayerEntity) private readonly playerRepository: Repository<PlayerEntity>) {
    }

    async findByMail(email: string): Promise<Player> {
        const playerEntity = await this.playerRepository.findOne({email: email});
        return this.toPlayer(playerEntity);
    }

    async save(player: CreatePlayerDto): Promise<Player> {
        const playerEntity = this.toPlayerEntity(player);

        const savedPlayer: PlayerEntity = await this.playerRepository.save(playerEntity);

        return this.toPlayer(savedPlayer);
    }

    async findById(id: number): Promise<Player> {

        const playerEntity: PlayerEntity = await this.playerRepository.findOne(id);
        return this.toPlayer(playerEntity);
    }

    private toPlayerEntity(player: CreatePlayerDto): PlayerEntity {
        const playerEntity: PlayerEntity = new PlayerEntity();

        playerEntity.email = player.email;
        playerEntity.name = player.name;
        playerEntity.password = player.password;

        return playerEntity;
    }

    private toPlayer(savedPlayer: PlayerEntity): Player {
        return savedPlayer ? new Player(savedPlayer.id, savedPlayer.name, savedPlayer.email, savedPlayer.password) : null;
    }
}