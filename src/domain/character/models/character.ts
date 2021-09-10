import {InvalidCharacterError} from "../invalid-character.error";

export class Character {

    name: string;
    skillPoints: number = 12;
    health: number;
    attack: number;
    defense: number;
    magik: number;
    playerId: number;
    level: number;

    static DEFAULT_HEALTH = 10;

    constructor(name: string, skillPoints: number, health: number, attack: number, defense: number, magik: number, level: number, playerId: number) {
        this.skillPoints = skillPoints;
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.magik = magik;
        this.level = level;
        this.playerId = playerId;
    }
}