import { Handler } from '@game/common/interfaces/handler.interfacer';

import { CharacterRepository } from '@game/character/repositories/character.repository';

import { Character } from '../';

export class CharacterCreateHandler
  implements Handler<Character, Promise<void>>
{
  private readonly characterRepository = new CharacterRepository();

  async handle(character: Character): Promise<void> {
    return this.characterRepository.create(character);
  }
}
