import { CharacterHandler } from './character.interfaces';

import { Character } from '..';

export class CharacterRestoreHandler
  implements CharacterHandler<Character, void>
{
  handle(character: Character): void {
    character.hp = character.maxHp;
    character.mp = character.maxMp;
  }
}
