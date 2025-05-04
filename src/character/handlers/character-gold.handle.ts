import { Character } from '@game/character';

import { Handler } from '@game/common/interfaces/handler.interfacer';

export type CharacterGoldHandlerInput = {
  character: Character;
  gold: number;
  action: 'increase' | 'decrease' | 'set';
};

export class CharacterGoldHandler
  implements Handler<CharacterGoldHandlerInput, void>
{
  handle({ character, gold, action }: CharacterGoldHandlerInput): void {
    switch (action) {
      case 'increase':
        character.gold += gold;
        break;

      case 'decrease':
        character.gold = Math.max(0, character.gold - gold);
        break;

      case 'set':
        character.gold = Math.max(0, gold);
        break;
    }
  }
}
