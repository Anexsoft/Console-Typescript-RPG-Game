import {
  MainScene,
  TownScene,
  InnScene,
  StoreScene,
  TavernScene,
  CombatScene,
  SceneHandler,
} from '@game/scenes';

import { Dialoguer } from '@game/common/dialoguer';
import { template } from '@game/common/template';

import { GAME_TEXTS } from './constants/texts';
import { GAME_TEXTS_TYPES } from './types/texts.types';

export enum GameManagerSceneName {
  MainScene,
  TownScene,
  InnScene,
  StoreScene,
  TavernScene,
  CombatScene,
}

type GameManagerScene = {
  [GameManagerSceneName.MainScene]: SceneHandler;
  [GameManagerSceneName.TownScene]: SceneHandler;
  [GameManagerSceneName.InnScene]: SceneHandler;
  [GameManagerSceneName.StoreScene]: SceneHandler;
  [GameManagerSceneName.TavernScene]: SceneHandler;
  [GameManagerSceneName.CombatScene]: SceneHandler;
};

export class GameManager {
  private static readonly scenes: GameManagerScene = {
    [GameManagerSceneName.MainScene]: new MainScene(),
    [GameManagerSceneName.TownScene]: new TownScene(),
    [GameManagerSceneName.InnScene]: new InnScene(),
    [GameManagerSceneName.StoreScene]: new StoreScene(),
    [GameManagerSceneName.TavernScene]: new TavernScene(),
    [GameManagerSceneName.CombatScene]: new CombatScene(),
  };

  static changeScene<Input>(name: GameManagerSceneName, param?: Input): void {
    Dialoguer.clear();
    this.scenes[name].handle(param);
  }

  static getMessage<T>(type: GAME_TEXTS_TYPES, params?: T): string {
    return template(GAME_TEXTS[type], params);
  }
}
