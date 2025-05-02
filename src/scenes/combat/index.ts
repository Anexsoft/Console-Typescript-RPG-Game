import { Character } from '@game/character';

import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { STATS_AVAILABLE_PER_LEVEL } from '@game/engine/constants/character';
import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';
import {
  CharacterNewLevelReachedMessageText,
  CharacterStatusMessageText,
  CombatEnemyAppearMessageText,
  CombatWinGoldMessageText,
  CombatWinMessageText,
  EnemyStatusMessageText,
  GameStatsChooseMessage,
} from '@game/engine/types/texts.types';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CharacterLevelProgressHandler } from '@game/character/handlers/character-level-progress.handler';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';
import { CharacterUpgradeHandler } from '@game/character/handlers/character-upgrade.handler';

import { Enemy } from '@game/npc/enemy';
import { EnemyType } from '@game/npc/enemy/enemies.enum';
import {
  CombatHandler,
  FightReport,
} from '@game/npc/enemy/handlers/combat.handler';
import { EnemyCreateHandler } from '@game/npc/enemy/handlers/enemy-create.handler';

type CombatSceneInput = {
  place: CombatPlace;
};

export enum CombatPlace {
  GOBLINGS_FOREST,
  GOLEM_FOREST,
  DRAGON_FOREST,
}

type EnemyStrength = 'weak' | 'strongest';

export class CombatScene implements SceneHandler {
  private readonly enemyCreateHandler = new EnemyCreateHandler();
  private readonly combatHandler = new CombatHandler();

  private readonly characterLevelProgressHandler =
    new CharacterLevelProgressHandler();
  private readonly characterUpgradeHandler = new CharacterUpgradeHandler();
  private readonly characterUpdateHandler = new CharacterUpdateHandler();

  async handle({ place }: CombatSceneInput): Promise<void> {
    const character = GameState.character;
    const message = this.getMessageForPlace(place);

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message,
    });

    const enemy = this.createEnemyFromPlace(place);

    await this.announceEnemy(enemy);

    const report = this.fight(character, enemy);

    await this.printLogs(report, character, enemy);

    await this.updatePlayerProgress(character, report.expPointsEarned);

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  private getMessageForPlace(place: CombatPlace): string {
    switch (place) {
      case CombatPlace.GOBLINGS_FOREST:
        return GameManager.getMessage('FOREST_ENTERING_GOBLINGS');
      case CombatPlace.GOLEM_FOREST:
        return GameManager.getMessage('FOREST_ENTERING_GOLEM');
      case CombatPlace.DRAGON_FOREST:
        return GameManager.getMessage('FOREST_ENTERING_DRAGON');
    }
  }

  private createEnemyFromPlace(place: CombatPlace): Enemy {
    let type: EnemyType;
    let power: EnemyStrength;

    switch (place) {
      case CombatPlace.GOBLINGS_FOREST:
        type = EnemyType.GOBLIN;
        power = 'weak';
        break;
      case CombatPlace.GOLEM_FOREST:
        type = EnemyType.GOLEM;
        power = 'weak';
        break;
      case CombatPlace.DRAGON_FOREST:
        type = EnemyType.DRAGON;
        power = 'strongest';
        break;
      default:
        throw new Error('Unknown combat place');
    }

    return this.enemyCreateHandler.handle({ type, power });
  }

  private fight(character: Character, enemy: Enemy): FightReport {
    return this.combatHandler.handle({ character, enemy });
  }

  private async announceEnemy(enemy: Enemy): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<CombatEnemyAppearMessageText>(
        'COMBAT_ENEMY_APPEAR',
        { enemyName: enemy.name },
      ),
    });

    await Dialoguer.send({
      who: DialoguerType.ENEMY,
      message: GameManager.getMessage<EnemyStatusMessageText>('ENEMY_STATUS', {
        ...enemy,
      }),
    });
  }

  private async printLogs(
    log: FightReport,
    character: Character,
    enemy: Enemy,
  ): Promise<void> {
    for (const entry of log.logs) {
      if (entry.who === DialoguerType.ENEMY) {
        await Dialoguer.send({
          who: entry.who,
          message: entry.message,
          options: {
            nameOverride: enemy.name,
          },
        });
      } else {
        await Dialoguer.send({
          who: entry.who,
          message: entry.message,
        });
      }
    }

    if (log.winner === 'character') {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: GameManager.getMessage<CombatWinMessageText>('COMBAT_WIN', {
          expPointsEarned: log.expPointsEarned,
        }),
      });

      await Dialoguer.send({
        who: DialoguerType.GAME,
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

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<CharacterStatusMessageText>(
        'CHARACTER_STATUS',
        { ...character },
      ),
    });
  }

  private async updatePlayerProgress(
    character: Character,
    newExpPoints: number,
  ): Promise<void> {
    const { newLevelReached, newLevel } =
      this.characterLevelProgressHandler.handle({
        character,
        newExpPoints,
      });

    if (newLevelReached) {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: GameManager.getMessage<CharacterNewLevelReachedMessageText>(
          'CHARACTER_NEW_LEVEL_REACHED',
          { newLevel },
        ),
      });

      await this.improvePlayerAttributes(character);
    }

    await this.characterUpdateHandler.handle(character);
  }

  private async improvePlayerAttributes(character: Character): Promise<void> {
    const statChoices = [
      { name: 'STR', value: 'str' },
      { name: 'VIT', value: 'vit' },
      { name: 'INT', value: 'int' },
      { name: 'DEX', value: 'dex' },
      { name: 'LUK', value: 'luk' },
    ];

    for (let i = 0; i < STATS_AVAILABLE_PER_LEVEL; i++) {
      const stat = await Dialoguer.send<'str' | 'vit' | 'int' | 'dex' | 'luk'>({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<GameStatsChooseMessage>(
          'GAME_STATS_CHOOSE',
          { index: i + 1, availableStats: STATS_AVAILABLE_PER_LEVEL },
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
