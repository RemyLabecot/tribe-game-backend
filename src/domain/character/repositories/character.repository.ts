import {Character} from "../models/character";

export interface CharacterRepository {

    create(createCharacter: Character): Promise<Character>;
    findCharacters(id: number): Promise<Character[]>;
}