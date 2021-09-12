import {CreatePlayer} from "../usecases/create.player";
import {PlayerRepositoryStub} from "./player-repository.stub";
import {AuthRepositoryStub} from "./auth-repository.stub";
import {CreatePlayerDto} from "../models/dto/create-player.dto";
import {InvalidPlayerError} from "../invalid-player.error";

describe('init', () => {
    let createPlayer: CreatePlayer;
    let playerRepoStub: PlayerRepositoryStub = new PlayerRepositoryStub();
    let authRepoStub: AuthRepositoryStub = new AuthRepositoryStub();

    beforeEach(async () => {
        createPlayer = new CreatePlayer(playerRepoStub, authRepoStub);
    });

    describe('create player', () => {
        it('should throw exception when player already exists with this mail', async () => {

            const createPlayerDto: CreatePlayerDto = new CreatePlayerDto("remy@test.fr", "password", "name");
            createPlayer.create(createPlayerDto).then().catch(e => expect(e).toBe(InvalidPlayerError))
        });
    })
});