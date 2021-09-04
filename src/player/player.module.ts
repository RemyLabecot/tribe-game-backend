import { Module } from '@nestjs/common';
import { PlayerService } from './service/player.service';
import { PlayerController } from './controller/player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './models/player.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerEntity]),
    AuthModule
  ],
  providers: [PlayerService],
  controllers: [PlayerController]
})
export class PlayerModule {}
