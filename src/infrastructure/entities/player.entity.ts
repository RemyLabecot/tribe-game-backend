import {BeforeInsert, Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";

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

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}