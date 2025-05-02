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
      message: GameManager.getMessage('TOWN_WHAT_TO_DO'),
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
        return GameManager.getMessage('TOWN_GO_TO_INN');
      case TownSceneAction.STORE:
        return GameManager.getMessage('TOWN_GO_TO_STORE');
      case TownSceneAction.TAVERN:
        return GameManager.getMessage('TOWN_GO_TO_TAVERN');
    }
  }

  async changeToCombatSceneOnSelectedPlace(): Promise<void> {
    const place = await Dialoguer.send<TownSceneAction>({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_GO_TO_HUNT'),
      options: {
        type: 'select',
        choices: [
          {
            name: 'Bosque de Goblins (lvl >1)',
            value: CombatPlace.GOBLINGS_FOREST,
          },
          {
            name: 'Bosque de Golems (lvl >30)',
            value: CombatPlace.GOLEM_FOREST,
          },
          {
            name: 'Bosque de Dragones (lvl >50)',
            value: CombatPlace.DRAGON_FOREST,
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
