import { CharacterRepository } from '@game/character/repositories/character.repository';

import { CharacterHandler } from './character.interfaces';

import { Character } from '..';

export class CharacterGetHandler
  implements CharacterHandler<string, Promise<Character>>
{
  private readonly characterRepository = new CharacterRepository();

  async handle(name: string): Promise<Character> {
    return this.characterRepository.findByName(name);
  }
}
