import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import {
  CHARACTER_LEVEL,
  CHARACTER_MAX_LEVEL,
} from '@game/engine/constants/character';
import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';
import {
  CharacterCurrentGoldMessageText,
  CharacterLevelUpPendingMessageText,
} from '@game/engine/types/texts.types';

export class CharacterScene implements SceneHandler {
  async handle(): Promise<void> {
    await this.showStatus();
    await this.showGold();
    await this.showPendingLevelUp();

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  private async showStatus(): Promise<void> {
    const character = GameState.character;

    await Dialoguer.send({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<CharacterCurrentGoldMessageText>(
        'CHARACTER_CURRENT_STATUS',
        {
          ...character,
        },
      ),
    });
  }

  private async showGold(): Promise<void> {
    const character = GameState.character;

    await Dialoguer.send({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<CharacterCurrentGoldMessageText>(
        'CHARACTER_CURRENT_GOLD',
        {
          gold: character.gold,
        },
      ),
    });
  }

  private async showPendingLevelUp(): Promise<void> {
    const character = GameState.character;

    if (character.level >= CHARACTER_MAX_LEVEL) return;

    const newLevel = character.level + 1;
    const [min] = CHARACTER_LEVEL[newLevel];
    const pendingExperience = min - character.exp;

    if (pendingExperience > 0) {
      await Dialoguer.send({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<CharacterLevelUpPendingMessageText>(
          'CHARACTER_LEVEL_UP_PENDING',
          {
            pendingExperience,
            newLevel,
          },
        ),
      });
    }
  }
}
