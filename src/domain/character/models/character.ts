export class Character {

    imageUrl: string;
    skillPoints: number = 12;
    health: number;
    attack: number;
    defense: number;
    magik: number;
    playerId: number;
    level: number;

    static DEFAULT_HEALTH = 10;

    constructor(imageUrl: string, skillPoints: number, health: number, attack: number, defense: number, magik: number, level: number, playerId: number) {
        this.skillPoints = skillPoints;
        this.imageUrl = imageUrl;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.magik = magik;
        this.level = level;
        this.playerId = playerId;
    }
}