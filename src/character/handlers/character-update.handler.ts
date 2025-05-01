import { CharacterRepository } from '@game/character/repositories/character.repository';

import { CharacterHandler } from './character.interfaces';

import { Character } from '..';

export class CharacterUpdateHandler
  implements CharacterHandler<Character, Promise<void>>
{
  private readonly characterRepository = new CharacterRepository();

  async handle(character: Partial<Character>): Promise<void> {
    return this.characterRepository.update(character._id, character);
  }
}
