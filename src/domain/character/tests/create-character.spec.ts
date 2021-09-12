import {CreateCharacter} from "../usecases/create-character";
import {CreateCharacterDto} from "../models/dto/create-character.dto";
import {InvalidCharacterError} from "../invalid-character.error";
import {CharacterRepositoryStub} from "./character-repository.stub";

describe('init', () => {
    let createCharacter: CreateCharacter;
    let characterRepoStub: CharacterRepositoryStub = new CharacterRepositoryStub();

    beforeEach(async () => {
        createCharacter = new CreateCharacter(characterRepoStub);
    });

    describe('create character', () => {
        it('should throw exception when character has not enough skill points', async () => {

            const createCharacterDto: CreateCharacterDto = new CreateCharacterDto("Ryu", 12, 13, 4, 3, 3, 1, 1);
            expect(() => {
                createCharacter.create(createCharacterDto)
            }).toThrow(InvalidCharacterError);
        });
    })
});