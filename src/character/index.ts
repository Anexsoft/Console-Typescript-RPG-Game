import { ObjectId } from 'mongodb';

import { STR, VIT, INT, DEX, LUK } from '@game/engine/constants/character';

export class Character {
  /** MongoDB ObjectId */
  _id?: ObjectId;

  /** Character's name */
  name: string;

  /** Strength – affects physical damage. Higher strength means more power. */
  str: number;

  /** Vitality – affects HP. The higher the value, the more life the character has. */
  vit: number;

  /** Intelligence – affects MP. Determines how much mana the character can use. */
  int: number;

  /** Dexterity – affects evasion. Higher dex increases the chance to dodge attacks. */
  dex: number;

  /** Luck – affects critical rate. More luck increases critical hit chance. */
  luk: number;

  /** Character level – used to scale base stats over time. Starts at 1. */
  level: number = 1;

  /** Current experience – used to determine level progression. Starts at 0. */
  exp: number = 0;

  /** Current HP – actual life points. Can be reduced or restored during gameplay. */
  hp: number;

  /** Current MP – actual mana points. Used for skills or magic. */
  mp: number;

  /** Max HP – calculated from vitality and level. Used to limit current HP. */
  maxHp: number;

  /** Max MP – calculated from intelligence and level. Used to limit current MP. */
  maxMp: number;

  /** Evasion rate – chance to dodge an attack, based on dexterity (as a proportion). */
  eva: number;

  /** Critical rate – chance to land a critical hit, based on luck (as a proportion). */
  ctr: number;

  /** Physical damage – calculated from strength (STR). */
  dmg: number;

  constructor(name: string) {
    this.name = name;

    this.str = STR;
    this.vit = VIT;
    this.int = INT;
    this.dex = DEX;
    this.luk = LUK;

    this.level = 1;
    this.exp = 0;
    this.maxHp = 0;
    this.maxMp = 0;
    this.hp = 0;
    this.mp = 0;
    this.eva = 0;
    this.ctr = 0;
    this.dmg = 0;
  }
}
