import { Character } from '@game/character';

import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { STATS_AVAILABLE_PER_LEVEL } from '@game/engine/constants/character';
import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';
import {
  CharacterNewLevelReachedMessageText,
  CharacterCurrentStatusMessageText,
  CombatEnemyAppearMessageText,
  CombatEnteringMessageText,
  CombatWinGoldMessageText,
  CombatWinMessageText,
  EnemyStatusMessageText,
  GameStatsChooseMessage,
} from '@game/engine/types/texts.types';

import {
  CharacterFightHandler,
  FightReport,
} from '@game/character/handlers/character-fight.handler';
import { CharacterGoldHandler } from '@game/character/handlers/character-gold.handle';
import { CharacterLevelProgressHandler } from '@game/character/handlers/character-level-progress.handler';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';
import { CharacterUpgradeHandler } from '@game/character/handlers/character-upgrade.handler';

import { Enemy } from '@game/npc/enemy';
import { EnemyLocation } from '@game/npc/enemy/collection/enemy-location.collection';
import { EnemyCreateHandler } from '@game/npc/enemy/handlers/enemy-create.handler';
import { EnmyGetCollectionHandler } from '@game/npc/enemy/handlers/enemy-get-collection.handler';

type CombatSceneInput = {
  location: EnemyLocation;
};

export class CombatScene implements SceneHandler {
  private readonly enemyCreateHandler = new EnemyCreateHandler();
  private readonly enemyGetCollectionHandler = new EnmyGetCollectionHandler();

  private readonly CharacterFightHandler = new CharacterFightHandler();
  private readonly characterLevelProgressHandler =
    new CharacterLevelProgressHandler();
  private readonly characterUpgradeHandler = new CharacterUpgradeHandler();
  private readonly characterUpdateHandler = new CharacterUpdateHandler();
  private readonly characterGoldHandler = new CharacterGoldHandler();

  async handle({ location }: CombatSceneInput): Promise<void> {
    const character = GameState.character;

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<CombatEnteringMessageText>(
        'COMBAT_ENTERING_MESSAGE',
        { locationName: location },
      ),
    });

    const enemies = this.getEnemiesFromLocation(location);

    await this.announceEnemies(enemies);

    const report = this.CharacterFightHandler.handle({ character, enemies });

    await this.printLogs(report);

    await this.updatePlayerProgress(
      character,
      report.expPointsEarned,
      report.goldEarned,
    );

    if (report.winner === 'character') {
      GameManager.changeScene(GameManagerSceneName.TownScene);
    } else {
      GameManager.changeScene(GameManagerSceneName.InnScene);
    }
  }

  private getEnemiesFromLocation(location: EnemyLocation): Enemy[] {
    const enemyCollection = this.enemyGetCollectionHandler.handle(location);

    return enemyCollection.map((type) => this.enemyCreateHandler.handle(type));
  }

  private async announceEnemies(enemies: Enemy[]): Promise<void> {
    for (const enemy of enemies) {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: GameManager.getMessage<CombatEnemyAppearMessageText>(
          'COMBAT_ENEMY_APPEAR',
          { enemyName: enemy.name },
        ),
      });

      await Dialoguer.send({
        who: DialoguerType.ENEMY,
        message: GameManager.getMessage<EnemyStatusMessageText>(
          'ENEMY_STATUS',
          enemy,
        ),
        options: {
          nameOverride: enemy.name,
        },
      });
    }
  }

  private async printLogs(log: FightReport): Promise<void> {
    for (const entry of log.logs) {
      await Dialoguer.send({
        who: entry.who,
        message: entry.message,
        options: {
          nameOverride: entry.enemyName,
        },
      });
    }

    if (log.winner === 'character') {
      await Dialoguer.send({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<CombatWinMessageText>('COMBAT_WIN', {
          expPointsEarned: log.expPointsEarned,
        }),
      });

      await Dialoguer.send({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<CombatWinGoldMessageText>(
          'COMBAT_WIN_GOLD',
          { goldEarned: log.goldEarned },
        ),
      });
    } else {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: GameManager.getMessage('COMBAT_LOSE'),
      });
    }
  }

  private async updatePlayerProgress(
    character: Character,
    newExpPoints: number,
    goldEarned: number,
  ): Promise<void> {
    this.characterGoldHandler.handle({
      character,
      gold: goldEarned,
      action: 'increase',
    });

    const { isNewLevelReached, levelsGained } =
      this.characterLevelProgressHandler.handle({
        character,
        newExpPoints,
      });

    if (isNewLevelReached) {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: GameManager.getMessage<CharacterNewLevelReachedMessageText>(
          'CHARACTER_NEW_LEVEL_REACHED',
          { newLevel: character.level },
        ),
      });

      await this.improvePlayerAttributes(character, levelsGained);
    }

    await this.characterUpdateHandler.handle(character);

    await Dialoguer.send({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<CharacterCurrentStatusMessageText>(
        'CHARACTER_CURRENT_STATUS',
        { ...character },
      ),
    });
  }

  private async improvePlayerAttributes(
    character: Character,
    levelsGained: number,
  ): Promise<void> {
    const availableStats = levelsGained * STATS_AVAILABLE_PER_LEVEL;

    const statChoices = [
      { name: 'STR', value: 'str' },
      { name: 'VIT', value: 'vit' },
      { name: 'INT', value: 'int' },
      { name: 'DEX', value: 'dex' },
      { name: 'LUK', value: 'luk' },
    ];

    for (let i = 0; i < availableStats; i++) {
      const stat = await Dialoguer.send<'str' | 'vit' | 'int' | 'dex' | 'luk'>({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<GameStatsChooseMessage>(
          'GAME_STATS_CHOOSE',
          { index: i + 1, availableStats },
        ),
        options: {
          type: 'list',
          choices: statChoices,
        },
      });

      character[stat]++;
    }

    this.characterUpgradeHandler.handle(character);
  }
}
