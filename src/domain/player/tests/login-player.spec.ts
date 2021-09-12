import {PlayerRepositoryStub} from "./player-repository.stub";
import {AuthRepositoryStub} from "./auth-repository.stub";
import {CreatePlayerDto} from "../models/dto/create-player.dto";
import {InvalidPlayerError} from "../invalid-player.error";
import {LoginPlayer} from "../usecases/login.player";
import {InvalidPlayerRepositoryStub} from "./invalid-player-repository.stub";

describe('init', () => {
    describe('login player', () => {
        it('should throw exception when send wrong password', async () => {
            let loginPlayer: LoginPlayer;
            let playerRepoStub: PlayerRepositoryStub = new PlayerRepositoryStub();
            let authRepoStub: AuthRepositoryStub = new AuthRepositoryStub();

            loginPlayer = new LoginPlayer(playerRepoStub, authRepoStub);

            const createPlayerDto: CreatePlayerDto = new CreatePlayerDto("remy@test.fr", "password", "name");
            loginPlayer.login(createPlayerDto).then().catch(e => expect(e).toBe(InvalidPlayerError))
        });

        it('should throw exception when email does not exist', async () => {
            let loginPlayer: LoginPlayer;
            let playerRepoStub: InvalidPlayerRepositoryStub = new InvalidPlayerRepositoryStub();
            let authRepoStub: AuthRepositoryStub = new AuthRepositoryStub();

            loginPlayer = new LoginPlayer(playerRepoStub, authRepoStub);

            const createPlayerDto: CreatePlayerDto = new CreatePlayerDto("remy@test.fr", "password", "name");
            loginPlayer.login(createPlayerDto).then().catch(e => expect(e).toBe(InvalidPlayerError))
        });
    })
});