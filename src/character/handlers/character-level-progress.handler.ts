import { CHARACTER_LEVEL } from '@game/engine/constants/character';

import { CharacterHandler } from './character.interfaces';

import { Character } from '..';

type Response = {
  newLevelReached: boolean;
  newLevel?: number;
};

type CharacterLevelProgressInput = {
  character: Character;
  newExpPoints: number;
};

export class CharacterLevelProgressHandler
  implements CharacterHandler<CharacterLevelProgressInput, Response>
{
  handle({ character, newExpPoints }: CharacterLevelProgressInput): Response {
    character.exp += newExpPoints;

    const maxLevel = Math.max(...Object.keys(CHARACTER_LEVEL).map(Number));

    if (character.level >= maxLevel) {
      character.level = maxLevel;
      character.exp = Math.min(character.exp, CHARACTER_LEVEL[maxLevel][1]);
      return { newLevelReached: false };
    }

    const [, upperLimit] = CHARACTER_LEVEL[character.level];

    if (character.exp > upperLimit) {
      character.level++;
      return {
        newLevelReached: true,
        newLevel: character.level,
      };
    }

    return {
      newLevelReached: false,
    };
  }
}
