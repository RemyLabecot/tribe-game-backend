import {CharacterRepository} from "../repositories/character.repository";
import {Character} from "../models/character";
import {CreateCharacterDto} from "../models/dto/create-character.dto";
import {InvalidCharacterError} from "../invalid-character.error";

export class CreateCharacter {

    private characterRepository: CharacterRepository;

    static readonly DEFAULT_SKILL_POINTS = 12;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    create(createCharacter: CreateCharacterDto): Promise<Character> {
        this.checkSkillPointsAwarding(createCharacter);
        const character: Character = this.toCharacter(createCharacter);

        return this.characterRepository.create(character);
    }

    private toCharacter(createCharacter: CreateCharacterDto): Character {
        return new Character(createCharacter.imageUrl, createCharacter.skillPoints, createCharacter.health, createCharacter.attack, createCharacter.defense, createCharacter.magik, createCharacter.level, createCharacter.playerId);
    }

    private checkSkillPointsAwarding(createCharacter: CreateCharacterDto): number {
        const skillsAwardingCost = this.skillsAwardingCost(createCharacter);
        if ((CreateCharacter.DEFAULT_SKILL_POINTS - skillsAwardingCost) < 0) {
            throw new InvalidCharacterError("Not enough skill points");
        }
        return skillsAwardingCost;
    }

    private skillsAwardingCost(createCharacter: CreateCharacterDto): number {
        return this.incrementSkillCost(createCharacter.attack) + this.incrementSkillCost(createCharacter.defense) + this.incrementSkillCost(createCharacter.magik) + (createCharacter.health - Character.DEFAULT_HEALTH);
    }

    private incrementSkillCost(skillCost: number): number {
        let cost = 0;
        while (skillCost > 1) {
            cost += Math.ceil(skillCost / 5);
            skillCost--;
        }
        return cost;
    }
}