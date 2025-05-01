import 'dotenv/config';

import { GameManager, GameManagerSceneName } from './engine/game.manager';

async function main(): Promise<void> {
  GameManager.changeScene(GameManagerSceneName.MainScene);
}

main();
