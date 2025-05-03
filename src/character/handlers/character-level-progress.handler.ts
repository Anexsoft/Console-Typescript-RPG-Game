import { Handler } from '@game/common/interfaces/handler.interfacer';

import { CHARACTER_LEVEL } from '@game/engine/constants/character';

import { Character } from '..';

type CharacterLevelProgressHandlerResponse = {
  newLevelReached: boolean;
  newLevel?: number;
  levelsGained?: number;
};

type CharacterLevelProgressInput = {
  character: Character;
  newExpPoints: number;
};

export class CharacterLevelProgressHandler
  implements
    Handler<CharacterLevelProgressInput, CharacterLevelProgressHandlerResponse>
{
  handle({
    character,
    newExpPoints,
  }: CharacterLevelProgressInput): CharacterLevelProgressHandlerResponse {
    const maxLevel = Math.max(...Object.keys(CHARACTER_LEVEL).map(Number));

    character.exp += newExpPoints;

    let newLevel = character.level;

    for (let level = maxLevel; level >= 1; level--) {
      const [min, max] = CHARACTER_LEVEL[level];
      if (character.exp >= min && character.exp <= max) {
        newLevel = level;
        break;
      }
    }

    const levelsGained = newLevel - character.level;
    const newLevelReached = levelsGained > 0;

    if (newLevelReached) {
      character.level = newLevel;
    }

    return {
      newLevelReached,
      newLevel: newLevelReached ? newLevel : undefined,
      levelsGained: newLevelReached ? levelsGained : undefined,
    };
  }
}
