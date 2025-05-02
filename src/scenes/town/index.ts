import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CombatPlace } from '../combat';

enum TownSceneAction {
  INN,
  STORE,
  TAVERN,
  HUNT,
}

export class TownScene implements SceneHandler {
  async handle(): Promise<void> {
    const action = await Dialoguer.send<TownSceneAction>({
      who: DialoguerType.GAME,
      message: 'Te encuentras en el pueblo principal. ¿Qué deseas hacer?',
      options: {
        type: 'select',
        choices: [
          { name: 'Ir a descansar', value: TownSceneAction.INN },
          { name: 'Ir a la tienda', value: TownSceneAction.STORE },
          { name: 'Ir a la taberna', value: TownSceneAction.TAVERN },
          { name: 'Ir a cazar', value: TownSceneAction.HUNT },
        ],
      },
    });

    if (action === TownSceneAction.HUNT) {
      await this.changeToCombatSceneOnSelectedPlace();
    } else {
      await this.changeSceneOnSelectedAction(action);
    }
  }

  getActionMessage(action: TownSceneAction): string {
    switch (action) {
      case TownSceneAction.INN:
        return 'Te diriges a descansar ...';
      case TownSceneAction.STORE:
        return 'Te diriges a la tienda ...';
      case TownSceneAction.TAVERN:
        return 'Te diriges a la taberna ...';
      default:
        return 'Acción desconocida.';
    }
  }

  async changeToCombatSceneOnSelectedPlace(): Promise<void> {
    const place = await Dialoguer.send<TownSceneAction>({
      who: DialoguerType.GAME,
      message:
        'Haz decidido salir a cazar, siempre con cuidado donde vayas ...',
      options: {
        type: 'select',
        choices: [
          {
            name: 'Bosque de GOBLINs (lvl <10)',
            value: CombatPlace.GOBLINGS_FOREST,
          },
        ],
      },
    });

    GameManager.changeScene(GameManagerSceneName.CombatScene, { place });
  }

  async changeSceneOnSelectedAction(action: TownSceneAction): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: this.getActionMessage(action),
    });

    switch (action) {
      case TownSceneAction.INN:
        GameManager.changeScene(GameManagerSceneName.InnScene);
        break;
      case TownSceneAction.STORE:
        GameManager.changeScene(GameManagerSceneName.StoreScene);
        break;
      case TownSceneAction.TAVERN:
        GameManager.changeScene(GameManagerSceneName.TavernScene);
        break;
    }
  }
}
