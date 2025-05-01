import {
  BASE_DMG,
  BASE_HP,
  BASE_MP,
  CTR_PER_LUK,
  DMG_PER_STR,
  EVA_PER_DEX,
  HP_PER_VIT,
  MP_PER_INT,
} from '@game/engine/constants/character';

import { CharacterHandler } from './character.interfaces';

import { Character } from '..';

export class CharacterStatsProgressHandler
  implements CharacterHandler<Character, void>
{
  handle(character: Character): void {
    character.maxHp = BASE_HP + character.level * character.vit * HP_PER_VIT;
    character.maxMp = BASE_MP + character.level * character.int * MP_PER_INT;

    character.eva = character.level * character.dex * EVA_PER_DEX;
    character.ctr = character.level * character.luk * CTR_PER_LUK;

    character.dmg = BASE_DMG + character.level * character.str * DMG_PER_STR;

    character.hp = character.maxHp;
    character.mp = character.maxMp;
  }
}
