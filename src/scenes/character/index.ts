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
  CharacterCurrentStatusMessageText,
  CharacterLevelUpPendingMessageText,
} from '@game/engine/types/texts.types';

import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';
import { CharacterUpdateSpecialPowerHandler } from '@game/character/handlers/features/character-update-special-power.handler';
import { CHARACTER_SPECIAL_POWER_COSTS } from '@game/character/types/special-power-costs.types';
import { CharacterSpecialPower } from '@game/character/types/special-power.types';

enum CharacterSceneAction {
  STATUS,
  LEVEL_PROGRESS,
  GOLD,
  SPECIAL_POWERS,
  EXIT,
}

export class CharacterScene implements SceneHandler {
  private readonly characterUpdateSpecialPowerHandler =
    new CharacterUpdateSpecialPowerHandler();
  private readonly characterUpdateHandler = new CharacterUpdateHandler();

  async handle(): Promise<void> {
    await this.showActionOptions();
  }

  private async executeAction(action: CharacterSceneAction): Promise<void> {
    switch (action) {
      case CharacterSceneAction.STATUS:
        await this.showStatus();
        break;
      case CharacterSceneAction.LEVEL_PROGRESS:
        await this.showPendingLevelUp();
        break;
      case CharacterSceneAction.GOLD:
        await this.showGold();
        break;
      case CharacterSceneAction.SPECIAL_POWERS:
        await this.updateDefaultSpecialPower();
        break;
    }
  }

  private async showActionOptions(): Promise<void> {
    Dialoguer.clear();

    const action = await Dialoguer.send<CharacterSceneAction>({
      who: DialoguerType.GAME,
      message: 'what would you like to review or change?',
      options: {
        type: 'list',
        choices: [
          { name: 'View Status', value: CharacterSceneAction.STATUS },
          {
            name: 'Level Progress',
            value: CharacterSceneAction.LEVEL_PROGRESS,
          },
          { name: 'View Gold', value: CharacterSceneAction.GOLD },
          {
            name: 'Set Default Special Power',
            value: CharacterSceneAction.SPECIAL_POWERS,
          },
          { name: 'Return to Town', value: CharacterSceneAction.EXIT },
        ],
      },
    });

    if (action === CharacterSceneAction.EXIT) {
      GameManager.changeScene(GameManagerSceneName.TownScene);
    } else {
      await this.executeAction(action);
    }
  }

  private async showStatus(): Promise<void> {
    const character = GameState.character;

    await Dialoguer.send({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<CharacterCurrentStatusMessageText>(
        'CHARACTER_CURRENT_STATUS',
        {
          ...character,
        },
      ),
    });

    await this.showActionOptions();
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

    await this.showActionOptions();
  }

  private async showPendingLevelUp(): Promise<void> {
    const character = GameState.character;

    if (character.level < CHARACTER_MAX_LEVEL) {
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
    } else {
      await Dialoguer.send({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage('CHARACTER_MAX_LEVEL_REACHED'),
      });
    }

    await this.showActionOptions();
  }

  private async updateDefaultSpecialPower(): Promise<void> {
    const character = GameState.character;
    const powers = Object.values(CharacterSpecialPower);

    const newPower = await Dialoguer.send<CharacterSpecialPower>({
      who: DialoguerType.PLAYER,
      message: 'choose your default special power:',
      options: {
        type: 'list',
        choices: powers.map((power) => ({
          name: `${power}: ${CHARACTER_SPECIAL_POWER_COSTS[power].description}`,
          value: power,
        })),
      },
    });

    this.characterUpdateSpecialPowerHandler.handle({
      character,
      specialPower: newPower,
    });

    await this.characterUpdateHandler.handle(character);

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: `[c:green]${newPower}[/] is now set as your default special power.`,
    });

    await this.showActionOptions();
  }
}
