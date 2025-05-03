import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';

import { EnemyLocation } from '@game/npc/enemy/collection/enemy-location.collection';

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
          { name: 'Rest at the inn', value: TownSceneAction.INN },
          { name: 'Visit the store', value: TownSceneAction.STORE },
          { name: 'Enter the tavern', value: TownSceneAction.TAVERN },
          { name: 'Go hunting', value: TownSceneAction.HUNT },
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
    const location = await Dialoguer.send<TownSceneAction>({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_GO_TO_HUNT'),
      options: {
        type: 'select',
        choices: [
          {
            name: 'Slime Fields (lvl 1-5)',
            value: EnemyLocation.SLIME_FIELDS,
          },
          {
            name: 'Abandoned Farm (lvl 6-10)',
            value: EnemyLocation.ABANDONED_FARM,
          },
          {
            name: 'Rat Caves (lvl 11-15)',
            value: EnemyLocation.RAT_CAVES,
          },
          {
            name: 'Spider Nest (lvl 16-22)',
            value: EnemyLocation.SPIDER_NEST,
          },
          {
            name: 'Goblin Camp (lvl 23-25)',
            value: EnemyLocation.GOBLIN_CAMP,
          },
          {
            name: 'Cursed Graveyard (lvl 26-30)',
            value: EnemyLocation.CURSED_GRAVEYARD,
          },
          {
            name: 'Bandit Hills (lvl 31-35)',
            value: EnemyLocation.BANDIT_HILLS,
          },
          {
            name: 'Troll Bridge (lvl 36-40)',
            value: EnemyLocation.TROLL_BRIDGE,
          },
          {
            name: 'Demonic Altar (lvl 41-45)',
            value: EnemyLocation.DEMONIC_ALTAR,
          },
          {
            name: 'Dragon Peak (lvl 46-50)',
            value: EnemyLocation.DRAGON_PEAK,
          },
        ],
      },
    });

    GameManager.changeScene(GameManagerSceneName.CombatScene, { location });
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
