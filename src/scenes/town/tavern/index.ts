import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';

import messages from './messages.json';

export class TavernScene implements SceneHandler {
  private messages: string[] = messages;

  async handle(): Promise<void> {
    const randomMessage = this.getRandomMessage();

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: randomMessage,
    });

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  private getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }
}
