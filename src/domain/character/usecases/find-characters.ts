import {CharacterRepository} from "../repositories/character.repository";
import {Character} from "../models/character";

export class FindCharacters {

    private characterRepository: CharacterRepository;

    constructor(characterRepository: CharacterRepository) {
        this.characterRepository = characterRepository;
    }

    findCharacters(id: number): Promise<Character[]> {
        return this.characterRepository.findCharacters(id);
    }
}