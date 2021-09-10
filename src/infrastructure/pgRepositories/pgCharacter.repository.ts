import {Injectable} from "@nestjs/common";
import {CharacterRepository} from "../../domain/character/repositories/character.repository";
import {InjectRepository} from '@nestjs/typeorm';
import {CharacterEntity} from "../entities/character.entity";
import {Repository} from "typeorm";
import {Character} from "../../domain/character/models/character";

@Injectable()
export class PgCharacterRepository implements CharacterRepository {

    constructor(@InjectRepository(CharacterEntity) private readonly characterRepository: Repository<CharacterEntity>) {}

    async create(character: Character): Promise<Character> {

        const savedCharacter = await this.characterRepository.save(this.toCharacterEntity(character));
        return this.toCharacter(savedCharacter);
    }

    private toCharacterEntity(character: Character): CharacterEntity {

        const characterEntity = new CharacterEntity();

        characterEntity.attack = character.attack;
        characterEntity.defense = character.defense;
        characterEntity.magik = character.magik;
        characterEntity.health = character.health;
        characterEntity.name = character.name;
        characterEntity.skillPoints = character.skillPoints;
        characterEntity.level = 1;
        characterEntity.playerId = character.playerId;

        return characterEntity;
    }

    private toCharacter(characterEntity: CharacterEntity): Character {
        return new Character(characterEntity.name, characterEntity.skillPoints, characterEntity.health, characterEntity.attack, characterEntity.defense, characterEntity.magik, characterEntity.level, characterEntity.playerId);
    }
}