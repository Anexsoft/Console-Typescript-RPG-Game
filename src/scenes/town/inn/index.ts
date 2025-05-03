import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';

import { CharacterRestoreHandler } from '@game/character/handlers/character-restore.handler';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';

export class InnScene implements SceneHandler {
  private readonly characterRestoreHandler = new CharacterRestoreHandler();
  private readonly characterUpdateHandler = new CharacterUpdateHandler();

  async handle(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_INN_RESTED'),
    });

    const character = GameState.character;

    this.characterRestoreHandler.handle(character);
    await this.characterUpdateHandler.handle(character);

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }
}
