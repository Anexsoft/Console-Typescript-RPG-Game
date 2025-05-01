import { Character } from '@game/character';

import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CharacterLevelProgressHandler } from '@game/character/handlers/character-level-progress.handler';
import { CharacterRestoreHandler } from '@game/character/handlers/character-restore.handler';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';

import { Enemy } from '@game/npc/enemy';
import { EnemyType } from '@game/npc/enemy/enemies.enum';
import { EnemyCreateHandler } from '@game/npc/enemy/handlers/enemy-create.handler';
import {
  EnemyFightHandler,
  FightReport,
} from '@game/npc/enemy/handlers/enemy-fight.handler';

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

  private readonly enemyFightHandler = new EnemyFightHandler();

  private readonly characterLevelProgressHandler =
    new CharacterLevelProgressHandler();

  private readonly characterRestoreHandler = new CharacterRestoreHandler();

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

    await this.updatePlayerProgress(character, report.expPointsEarned);

    await this.printLogs(report, character, enemy);

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  private getMessageForPlace(place: CombatPlace): string {
    switch (place) {
      case CombatPlace.GOBLINGS_FOREST:
        return 'Llegaste al Bosque de Goblins.';
      case CombatPlace.GOLEM_FOREST:
        return 'Llegaste al Bosque de Gólems.';
      case CombatPlace.DRAGON_FOREST:
        return 'Llegaste al Bosque de Dragones.';
      default:
        return 'Llegaste a un lugar desconocido.';
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
    return this.enemyFightHandler.handle({ character, enemy });
  }

  private async announceEnemy(enemy: Enemy): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: `⚔️ ¡${enemy.name} salvaje ha aparecido!`,
    });

    await Dialoguer.send({
      who: DialoguerType.ENEMY,
      message: `Nivel: ${enemy.level}, HP: ${enemy.maxHp}, Daño: ${enemy.dmg}, Evasión: ${enemy.eva}%, Crítico: ${enemy.ctr}%`,
      options: {
        nameOverride: enemy.name,
      },
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
        message: `¡Has ganado el combate y obtuviste ${log.expPointsEarned} puntos de experiencia!`,
      });
    } else {
      await Dialoguer.send({
        who: DialoguerType.GAME,
        message: 'Has sido derrotado en combate.',
      });
    }

    await Dialoguer.send({
      who: DialoguerType.PLAYER,
      message: `Estado actual - HP: ${character.hp}, MP: ${character.mp}, EXP: ${character.exp}, Nivel: ${character.level}`,
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
        message: `🎉 ¡Has alcanzado el nivel ${newLevel}!`,
      });

      this.characterRestoreHandler.handle(character);
    }

    await this.characterUpdateHandler.handle(character);
  }
}
