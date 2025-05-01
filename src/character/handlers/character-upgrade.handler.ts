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

export class CharacterUpgradeHandler
  implements CharacterHandler<Character, void>
{
  handle(character: Character): void {
    character.maxHp = Math.round(
      BASE_HP + character.level * character.vit * HP_PER_VIT,
    );
    character.maxMp = Math.round(
      BASE_MP + character.level * character.int * MP_PER_INT,
    );

    character.eva = parseFloat(
      (character.level * character.dex * EVA_PER_DEX).toFixed(4),
    );

    character.ctr = parseFloat(
      (character.level * character.luk * CTR_PER_LUK).toFixed(4),
    );

    character.dmg = parseFloat(
      (BASE_DMG + character.level * character.str * DMG_PER_STR).toFixed(4),
    );

    character.hp = Math.round(character.maxHp);
    character.mp = Math.round(character.maxMp);
  }
}
