import { Character } from '@game/character';

import { DEX, INT, LUK, STR, VIT } from '@game/engine/constants/character';

export function getCharacterFixture(entry?: Partial<Character>): Character {
  const character: Character = {
    name: 'Alucard',
    str: STR,
    vit: VIT,
    int: INT,
    dex: DEX,
    luk: LUK,
    maxHp: 0,
    maxMp: 0,
    hp: 0,
    mp: 0,
    ctr: 0,
    dmg: 0,
    eva: 0,
    gold: 0,
    exp: 0,
    level: 1,
    ...entry,
  };

  return character;
}
