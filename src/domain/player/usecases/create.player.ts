import {PlayerRepository} from "../repositories/player.repository";
import {CreatePlayerDto} from "../models/dto/create-player.dto";
import {Player} from "../models/player";
import {AuthRepository} from "../repositories/auth.repository";
import {InvalidPlayerError} from "../invalid-player.error";

export class CreatePlayer {

    constructor(private playerRepository: PlayerRepository, private authRepository: AuthRepository) {
    }

    create(createdPlayerDto: CreatePlayerDto): Promise<Player> {

        return this.mailExists(createdPlayerDto.email)
            .then((exist: boolean) => {
                    if (!exist) {
                        return this.authRepository.hashPassword(createdPlayerDto.password)
                            .then((hashPassword: string) => {
                                return this.playerRepository.save(new Player(null, createdPlayerDto.name, createdPlayerDto.email, hashPassword));
                            })
                    } else {
                        throw new InvalidPlayerError("Player with this email already exist");
                    }
                }
            )
    }

    private mailExists(email: string): Promise<boolean> {
        return this.playerRepository.findByMail(email)
            .then((player: Player) => {
                return !!player;
            });
    }
}