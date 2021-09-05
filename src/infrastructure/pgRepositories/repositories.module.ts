import {Module} from '@nestjs/common';
import {PgPlayerRepository} from "./pgPlayer.repository";
import {TypeOrmModule} from '@nestjs/typeorm';
import {PlayerEntity} from "../entities/player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity])],
    providers: [PgPlayerRepository],
    exports: [PgPlayerRepository],
})
export class RepositoriesModule {}