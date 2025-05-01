import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CharacterRestoreHandler } from '@game/character/handlers/character-restore.handler';

export class InnScene implements SceneHandler {
  private readonly characterRestoreHandler: CharacterRestoreHandler =
    new CharacterRestoreHandler();

  async handle(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: 'Haz dormido bien y te encuentras recuperado de energía',
    });

    await this.characterRestoreHandler.handle(GameState.character);

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }
}
