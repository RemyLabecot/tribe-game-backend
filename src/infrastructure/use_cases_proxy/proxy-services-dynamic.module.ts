import {DynamicModule, Module} from "@nestjs/common";
import {PgPlayerRepository} from "../pgRepositories/pgPlayer.repository";
import {UseCaseProxy} from "./use-case-proxy";
import {CreatePlayer} from "../../domain/player/usecases/create.player";
import {AuthService} from "../auth/auth.service";
import {RepositoriesModule} from "../pgRepositories/repositories.module";
import {LoginPlayer} from "../../domain/player/usecases/login.player";
import {AuthRepository} from "../../domain/player/repositories/auth.repository";
import {AuthModule} from "../auth/auth.module";
import {PgCharacterRepository} from "../pgRepositories/pgCharacter.repository";
import {CreateCharacter} from "../../domain/character/usecases/create-character";
import {FindCharacters} from "../../domain/character/usecases/find-characters";

@Module({
    imports: [RepositoriesModule, AuthModule]
})
export class ProxyServicesDynamicModule {

    static CREATE_PLAYER_DATA_PROXY_SERVICE: string = 'CreatePlayerDataProxyService';
    static LOGIN_PLAYER_DATA_PROXY_SERVICE: string = 'LoginPlayerDataProxyService';
    static CREATE_CHARACTER_DATA_PROXY_SERVICE: string = 'CreateCharacterDataProxyService';
    static FIND_CHARACTERS_DATA_PROXY_SERVICE: string = 'FindCharactersDataProxyService';

    static register(): DynamicModule {
        return {
            module: ProxyServicesDynamicModule,
            providers: [
                {
                    inject: [PgPlayerRepository, AuthService],
                    provide: ProxyServicesDynamicModule.CREATE_PLAYER_DATA_PROXY_SERVICE,
                    useFactory: (pgPlayerRepository: PgPlayerRepository, authRepository: AuthRepository) => new UseCaseProxy(new CreatePlayer(pgPlayerRepository, authRepository)),
                },
                {
                    inject: [PgPlayerRepository, AuthService],
                    provide: ProxyServicesDynamicModule.LOGIN_PLAYER_DATA_PROXY_SERVICE,
                    useFactory: (pgPlayerRepository: PgPlayerRepository, authRepository: AuthRepository) => new UseCaseProxy(new LoginPlayer(pgPlayerRepository, authRepository)),
                },
                {
                    inject: [PgCharacterRepository],
                    provide: ProxyServicesDynamicModule.CREATE_CHARACTER_DATA_PROXY_SERVICE,
                    useFactory: (pgCharacterRepository: PgCharacterRepository) => new UseCaseProxy(new CreateCharacter(pgCharacterRepository))
                },
                {
                    inject: [PgCharacterRepository],
                    provide: ProxyServicesDynamicModule.FIND_CHARACTERS_DATA_PROXY_SERVICE,
                    useFactory: (pgCharacterRepository: PgCharacterRepository) => new UseCaseProxy(new FindCharacters(pgCharacterRepository))
                }
            ],
            exports: [ProxyServicesDynamicModule.CREATE_PLAYER_DATA_PROXY_SERVICE, ProxyServicesDynamicModule.LOGIN_PLAYER_DATA_PROXY_SERVICE, ProxyServicesDynamicModule.CREATE_CHARACTER_DATA_PROXY_SERVICE, ProxyServicesDynamicModule.FIND_CHARACTERS_DATA_PROXY_SERVICE]
        };
    }
}
