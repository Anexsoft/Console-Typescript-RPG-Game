import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CharacterRestoreHandler } from '@game/character/handlers/character-restore.handler';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';

export class InnScene implements SceneHandler {
  private readonly characterRestoreHandler = new CharacterRestoreHandler();
  private readonly characterUpdateHandler = new CharacterUpdateHandler();

  async handle(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: 'Haz dormido bien y te encuentras recuperado de energía',
    });

    const character = GameState.character;

    this.characterRestoreHandler.handle(character);
    await this.characterUpdateHandler.handle(character);

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }
}
