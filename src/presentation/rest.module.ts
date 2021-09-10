import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {ProxyServicesDynamicModule} from "../infrastructure/use_cases_proxy/proxy-services-dynamic.module";
import {PlayerController} from "./controller/player.controller";
import {InvalidPlayerErrorFilter} from "./filters/invalid-player-error.filter";
import {InvalidCharacterError} from "../domain/character/invalid-character.error";
import {CharacterController} from "./controller/character.controller";

@Module({
    imports: [ProxyServicesDynamicModule.register()],
    controllers: [PlayerController, CharacterController],
    providers: [{ provide: APP_FILTER, useClass: InvalidPlayerErrorFilter }, { provide: APP_FILTER, useClass: InvalidCharacterError}],
})
export class RestModule {}