import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';

import { SceneHandler } from '@game/scenes/scene.interface';

export class StoreScene implements SceneHandler {
  async handle(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: 'La tienda está cerrada. ¡Abrimos pronto!',
    });

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }
}
