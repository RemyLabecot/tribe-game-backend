import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from '../models/dto/CreatePlayer.dto';
import { LoginPlayerDto } from '../models/dto/LoginPlayer.dto';
import { PlayerEntity } from '../models/player.entity';
import { PlayerI } from '../models/player.interface';

@Injectable()
export class PlayerService {

    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
        private authService: AuthService
    ) { }

    create(createdPlayerDto: CreatePlayerDto): Observable<PlayerI> {
        return this.mailExists(createdPlayerDto.email).pipe(
            switchMap((exists: boolean) => {
                if (!exists) {
                    return this.authService.hashPassword(createdPlayerDto.password).pipe(
                        switchMap((passwordHash: string) => {
                            // Overwrite the player password with the hash, to store it in the db
                            createdPlayerDto.password = passwordHash;
                            return from(this.playerRepository.save(createdPlayerDto)).pipe(
                                map((savedPlayer: PlayerI) => {
                                    const { password, ...player } = savedPlayer;
                                    return player;
                                })
                            )
                        })
                    )
                } else {
                    throw new HttpException('Email already in use', HttpStatus.CONFLICT);
                }
            })
        )
    }

    login(loginPlayerDto: LoginPlayerDto): Observable<string> {
        return this.findPlayerByEmail(loginPlayerDto.email).pipe(
            switchMap((player: PlayerI) => {
                if (player) {
                    return this.validatePassword(loginPlayerDto.password, player.password).pipe(
                        switchMap((passwordsMatches: boolean) => {
                            if (passwordsMatches) {
                                return this.findOne(player.id).pipe(
                                    switchMap((player: PlayerI) => this.authService.generateJwt(player))
                                )
                            } else {
                                throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
                            }
                        })
                    )
                } else {
                    throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
                }
            }
            )
        )
    }

    findAll(): Observable<PlayerI[]> {
        return from(this.playerRepository.find());
    }

    findOne(id: number): Observable<PlayerI> {
        return from(this.playerRepository.findOne({ id }));
    }

    private findPlayerByEmail(email: string): Observable<PlayerI> {
        return from(this.playerRepository.findOne({ email }, { select: ['id', 'email', 'name', 'password'] }));
    }

    private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
        return this.authService.comparePasswords(password, storedPasswordHash);
    }

    private mailExists(email: string): Observable<boolean> {
        return from(this.playerRepository.findOne({ email })).pipe(
            map((player: PlayerI) => {
                if (player) {
                    return true;
                } else {
                    return false;
                }
            })
        )
    }

}
