import { CharacterRepository } from '@game/character/repositories/character.repository';

import { CharacterHandler } from './character.interfaces';

import { Character } from '../';

export class CharacterCreateHandler
  implements CharacterHandler<Character, Promise<void>>
{
  private readonly characterRepository = new CharacterRepository();

  async handle(character: Character): Promise<void> {
    return this.characterRepository.create(character);
  }
}
