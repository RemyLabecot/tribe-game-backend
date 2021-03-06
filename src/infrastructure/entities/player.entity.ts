import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";
import {CharacterEntity} from "./character.entity";

@Entity('player')
export class PlayerEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column({select: true})
    password: string;

    @Column("int", {array: true, nullable: true})
    @OneToMany(() => CharacterEntity, characterEntity => characterEntity.player, {onDelete: 'CASCADE'})
    characters: CharacterEntity[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}