export class CreateCharacterDto {

    imageUrl: string;
    skillPoints: number = 12;
    health: number;
    attack: number;
    defense: number;
    magik: number;
    level: number;
    playerId: number;


    constructor(imageUrl: string, skillPoints: number, health: number, attack: number, defense: number, magik: number, level: number, playerId: number) {
        this.imageUrl = imageUrl;
        this.skillPoints = skillPoints;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.magik = magik;
        this.level = level;
        this.playerId = playerId;
    }
}
