import {CharacterRepository} from "../repositories/character.repository";
import {Character} from "../models/character";

export class CharacterRepositoryStub implements CharacterRepository {
    async create(createCharacter: Character): Promise<Character> {
        return new Character("Ryu", 12, 13, 3, 3, 3, 1, 1);
    }

    findCharacters(id: number): Promise<Character[]> {
        return undefined;
    }
}