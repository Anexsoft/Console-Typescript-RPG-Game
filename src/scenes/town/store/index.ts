import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';

export class StoreScene implements SceneHandler {
  async handle(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: 'La tienda está cerrada. ¡Abrimos pronto!',
    });

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }
}
