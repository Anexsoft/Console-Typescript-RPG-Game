import { Handler } from '@game/common/interfaces/handler.interfacer';

import { Character } from '..';

export class CharacterRestoreHandler implements Handler<Character, void> {
  handle(character: Character): void {
    character.hp = character.maxHp;
    character.mp = character.maxMp;
  }
}
