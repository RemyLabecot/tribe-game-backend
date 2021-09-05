import {Module} from '@nestjs/common';
import {APP_FILTER} from '@nestjs/core';
import {ProxyServicesDynamicModule} from "../infrastructure/use_cases_proxy/proxy-services-dynamic.module";
import {PlayerController} from "./controller/player.controller";
import {InvalidPlayerErrorFilter} from "./filters/invalid-player-error.filter";

@Module({
    imports: [ProxyServicesDynamicModule.register()],
    controllers: [PlayerController],
    providers: [{ provide: APP_FILTER, useClass: InvalidPlayerErrorFilter }],
})
export class RestModule {}