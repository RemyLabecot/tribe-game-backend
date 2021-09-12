import {PlayerRepository} from "../repositories/player.repository";
import {LoginPlayerDto} from "../models/dto/login-player.dto";
import {Player} from "../models/player";
import {AuthRepository} from "../repositories/auth.repository";
import {InvalidPlayerError} from "../invalid-player.error";

export class LoginPlayer {

    constructor(private playerRepository: PlayerRepository, private authRepository: AuthRepository) {
    }

    login(loginPlayerDto: LoginPlayerDto): Promise<string> {

        return this.findByEmail(loginPlayerDto.email)
            .then((player: Player) => {
                if (player) {
                    return this.validatePassword(loginPlayerDto.password, player.password)
                        .then((passwordMatches: boolean) => {
                            if (passwordMatches) {
                                return this.authRepository.generateJwt(player);
                            } else {
                                throw new InvalidPlayerError('Wrong password');
                            }
                        })
                } else {
                    throw new InvalidPlayerError("Player with this email/password doesn\'t exist");
                }
            });
    }

    public findByEmail(email: string): Promise<Player> {
        return this.playerRepository.findByMail(email);
    }

    private findById(id: number): Promise<Player> {
        return this.playerRepository.findById(id);
    }

    private validatePassword(password: string, storedPasswordHash: string): Promise<boolean> {
        return this.authRepository.comparePasswords(password, storedPasswordHash);
    }
}