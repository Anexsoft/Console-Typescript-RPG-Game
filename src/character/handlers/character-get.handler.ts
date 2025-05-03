import { Handler } from '@game/common/interfaces/handler.interfacer';

import { CharacterRepository } from '@game/character/repositories/character.repository';

import { Character } from '..';

export class CharacterGetHandler
  implements Handler<string, Promise<Character>>
{
  private readonly characterRepository = new CharacterRepository();

  async handle(name: string): Promise<Character> {
    return this.characterRepository.findByName(name);
  }
}
