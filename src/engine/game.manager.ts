import {
  MainScene,
  TownScene,
  InnScene,
  StoreScene,
  TavernScene,
  CombatScene,
  SceneHandler,
} from '@game/scenes';

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
    this.scenes[name].handle(param);
  }
}
