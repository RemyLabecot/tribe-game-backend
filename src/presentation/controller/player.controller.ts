import {Body, Controller, Get, HttpCode, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {CreatePlayerDto} from '../../domain/player/models/dto/create-player.dto';
import {Player} from '../../domain/player/models/player';
import {CreatePlayer} from "../../domain/player/usecases/create.player";
import {ProxyServicesDynamicModule} from "../../infrastructure/use_cases_proxy/proxy-services-dynamic.module";
import {UseCaseProxy} from "../../infrastructure/use_cases_proxy/use-case-proxy";
import {LoginPlayerDto} from "../../domain/player/models/dto/login-player.dto";
import {JwtAuthGuard} from "../../infrastructure/auth/guards/jwt-auth.guard";
import {LoginPlayer} from "../../domain/player/usecases/login.player";

@Controller('players')
export class PlayerController {

    constructor(@Inject(ProxyServicesDynamicModule.CREATE_PLAYER_DATA_PROXY_SERVICE) private readonly createPlayer: UseCaseProxy<CreatePlayer>,
                @Inject(ProxyServicesDynamicModule.LOGIN_PLAYER_DATA_PROXY_SERVICE) private readonly loginPlayer: UseCaseProxy<LoginPlayer>) {
    }

    @Post()
    create(@Body() createdPlayerDto: CreatePlayerDto): Promise<Player> {
        return this.createPlayer.getInstance().create(createdPlayerDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() loginPlayerDto: LoginPlayerDto): Promise<Object> {
        return this.loginPlayer.getInstance().login(loginPlayerDto)
            .then((jwt: string) => {
                return {
                    access_token: jwt,
                    token_type: 'JWT',
                    expires_in: 10000
                }
            });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    findByEmail(@Param('email') email: string): Promise<Player> {
        return this.loginPlayer.getInstance().findByEmail(email);
    }
}
