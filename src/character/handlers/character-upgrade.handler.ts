import { Handler } from '@game/common/interfaces/handler.interfacer';

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

import { Character } from '..';

export class CharacterUpgradeHandler implements Handler<Character, void> {
  handle(character: Character): void {
    character.maxHp = Math.round(
      BASE_HP + character.level * character.vit * HP_PER_VIT,
    );
    character.maxMp = Math.round(
      BASE_MP + character.level * character.int * MP_PER_INT,
    );

    character.eva = Math.round(character.level * character.dex * EVA_PER_DEX);
    character.ctr = Math.round(character.level * character.luk * CTR_PER_LUK);
    character.dmg = Math.round(
      BASE_DMG + character.level * character.str * DMG_PER_STR,
    );

    character.hp = Math.round(character.maxHp);
    character.mp = Math.round(character.maxMp);
  }
}
