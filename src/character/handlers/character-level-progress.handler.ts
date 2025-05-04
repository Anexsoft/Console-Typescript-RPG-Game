import { Handler } from '@game/common/interfaces/handler.interfacer';

import {
  CHARACTER_LEVEL,
  CHARACTER_MAX_LEVEL,
} from '@game/engine/constants/character';

import { Character } from '..';

type CharacterLevelProgressHandlerResponse = {
  isNewLevelReached: boolean;
  levelsGained: number;
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
    character.exp += newExpPoints;

    if (character.level >= CHARACTER_MAX_LEVEL) {
      return {
        isNewLevelReached: false,
        levelsGained: 0,
      };
    }

    let levelsGained = 0;

    for (let level = CHARACTER_MAX_LEVEL; level > 1; level--) {
      const [min, max] = CHARACTER_LEVEL[level];

      if (character.exp >= min && character.exp <= max) {
        levelsGained = level - character.level;
        character.level = level;

        break;
      }
    }

    return {
      isNewLevelReached: levelsGained > 0,
      levelsGained,
    };
  }
}
