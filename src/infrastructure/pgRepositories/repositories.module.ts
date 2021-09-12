import {Module} from '@nestjs/common';
import {PgPlayerRepository} from "./pgPlayer.repository";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlayerEntity} from "../entities/player.entity";
import {CharacterEntity} from "../entities/character.entity";
import {PgCharacterRepository} from "./pgCharacter.repository";

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity, CharacterEntity])],
    providers: [PgPlayerRepository, PgCharacterRepository],
    exports: [PgPlayerRepository, PgCharacterRepository],
})
export class RepositoriesModule {
}