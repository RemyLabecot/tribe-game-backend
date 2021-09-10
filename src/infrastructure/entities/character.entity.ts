import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {PlayerEntity} from "./player.entity";

@Entity('character')
export class CharacterEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    skillPoints: number = 12;

    @Column()
    health: number;

    @Column()
    attack: number;

    @Column()
    defense: number;

    @Column()
    magik: number;

    @Column()
    level: number;

    @ManyToOne(() => PlayerEntity, playerEntity => playerEntity.characters)
    player: PlayerEntity;

    @RelationId((character: CharacterEntity) => character.player)
    playerId: number;
}