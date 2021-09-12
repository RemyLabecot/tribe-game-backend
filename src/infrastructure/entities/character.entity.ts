import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PlayerEntity} from "./player.entity";

@Entity('character')
export class CharacterEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

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
    @JoinColumn({name: 'playerId'})
    player: PlayerEntity;

    @Column()
    playerId: number;
}