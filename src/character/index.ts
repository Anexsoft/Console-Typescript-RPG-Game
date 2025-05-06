import { ObjectId } from 'mongodb';

import { STR, VIT, INT, DEX, LUK } from '@game/engine/constants/character';

import { CharacterSpecialPower } from './types/special-power.types';

export class Character {
  /** MongoDB ObjectId */
  _id?: ObjectId;

  /** Character's name */
  name: string;

  /** Strength – affects physical damage. Higher strength means more power. */
  str: number = STR;

  /** Vitality – affects HP. The higher the value, the more life the character has. */
  vit: number = VIT;

  /** Intelligence – affects MP. Determines how much mana the character can use. */
  int: number = INT;

  /** Dexterity – affects evasion. Higher dex increases the chance to dodge attacks. */
  dex: number = DEX;

  /** Luck – affects critical rate. More luck increases critical hit chance. */
  luk: number = LUK;

  /** Character level – used to scale base stats over time. Starts at 1. */
  level: number = 1;

  /** Current experience – used to determine level progression. Starts at 0. */
  exp: number = 0;

  /** Gold – character's currency. Starts at 0. */
  gold: number = 0;

  /** Current HP – actual life points. Can be reduced or restored during gameplay. */
  hp: number = 0;

  /** Current MP – actual mana points. Used for skills or magic. */
  mp: number = 0;

  /** Max HP – calculated from vitality and level. Used to limit current HP. */
  maxHp: number = 0;

  /** Max MP – calculated from intelligence and level. Used to limit current MP. */
  maxMp: number = 0;

  /** Evasion rate – chance to dodge an attack, based on dexterity (as a proportion). */
  eva: number = 0;

  /** Critical rate – chance to land a critical hit, based on luck (as a proportion). */
  ctr: number = 0;

  /** Resistance rate – resistance bonus gained per level */
  res: number = 0;

  /** Physical damage – calculated from strength (STR). */
  dmg: number = 0;

  /** Special Power - default selected power to be use in combat. */
  specialPower?: CharacterSpecialPower = null;

  /** Special Power - available special powers to be used in combant. */
  specialPowers: CharacterSpecialPower[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
