import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlayerService } from '../service/player.service';
import {CreatePlayerDto} from '../models/dto/CreatePlayer.dto';
import {LoginPlayerDto} from "../models/dto/LoginPlayer.dto";
import {PlayerI} from '../models/player.interface';

@Controller('players')
export class PlayerController {

    constructor(private playerService: PlayerService) {}

    @Post()
    create(@Body() createdPlayerDto: CreatePlayerDto): Observable<PlayerI> {
        return this.playerService.create(createdPlayerDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() loginPlayerDto: LoginPlayerDto): Observable<Object> {
        return this.playerService.login(loginPlayerDto).pipe(
            map((jwt: string) => {
                return {
                    access_token: jwt,
                    token_type: 'JWT',
                    expires_in: 10000
                }
            })
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() request): Observable<PlayerI[]> {
        return this.playerService.findAll();
    }
}
