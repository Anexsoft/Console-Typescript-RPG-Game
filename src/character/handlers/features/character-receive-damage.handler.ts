import { Character } from '@game/character';

import { Handler } from '@game/common/interfaces/handler.interfacer';

export type CharacterReceiveDamageHandlerInput = {
  character: Character;
  dmg: number;
};

export class CharacterReceiveDamageHandler
  implements Handler<CharacterReceiveDamageHandlerInput, void>
{
  handle({ character, dmg }: CharacterReceiveDamageHandlerInput): void {
    character.hp = Math.max(0, character.hp - dmg);
  }
}
