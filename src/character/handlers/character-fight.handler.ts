import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  CombatAttackCritMessageText,
  CombatAttackMessageText,
  CombatEvadeMessageText,
} from '@game/engine/types/texts.types';

import { Enemy } from '@game/npc/enemy';

export type FightReport = {
  winner: 'character' | 'enemy';
  expPointsEarned: number;
  goldEarned: number;
  logs: FightReportLog[];
};

type FightReportLog = {
  who: DialoguerType;
  message: string;
  enemyName?: string;
};

type CharacterFightHandlerInput = {
  character: Character;
  enemies: Enemy[];
};

type Owner = 'enemy' | 'character';

export class CharacterFightHandler
  implements Handler<CharacterFightHandlerInput, FightReport>
{
  handle({ character, enemies }: CharacterFightHandlerInput): FightReport {
    const logs: FightReportLog[] = [];
    const aliveEnemies = [...enemies];

    while (character.hp > 0 && aliveEnemies.length > 0) {
      const targetEnemy = aliveEnemies[0];

      this.executeTurn(character, targetEnemy, logs, 'character', targetEnemy);

      if (!targetEnemy.isAlive()) {
        aliveEnemies.shift();
      }

      for (const enemy of aliveEnemies) {
        if (enemy.isAlive() && character.hp > 0) {
          this.executeTurn(enemy, character, logs, 'enemy', enemy);
        }
      }
    }

    const winner = character.hp > 0 ? 'character' : 'enemy';

    let expPointsEarned = 0;
    let goldEarned = 0;

    if (winner === 'character') {
      expPointsEarned = enemies.reduce((acc, e) => acc + e.expGiven, 0);
      goldEarned = enemies.reduce((acc, e) => acc + e.goldGiven, 0);
    }

    return { winner, expPointsEarned, goldEarned, logs };
  }

  private executeTurn(
    attacker: Character | Enemy,
    defender: Character | Enemy,
    logs: FightReportLog[],
    type: Owner,
    enemy?: Enemy,
  ): void {
    const dialoguerType =
      type === 'character' ? DialoguerType.PLAYER : DialoguerType.ENEMY;

    if (this.didEvade(defender)) {
      logs.push({
        who: dialoguerType,
        message: this.getEvadeMessage(defender),
        enemyName: enemy?.name,
      });
      return;
    }

    const isCrit = this.didCrit(attacker, type);
    let damage = attacker.dmg;
    if (isCrit) damage *= 2;

    if (defender instanceof Enemy) {
      defender.takeDamage(damage);
    } else {
      defender.hp = Math.max(0, defender.hp - damage);
    }

    logs.push({
      who: dialoguerType,
      message: this.getAttackMessage(defender, damage, isCrit),
      enemyName: enemy?.name,
    });
  }

  private getEvadeMessage(defender: Character | Enemy): string {
    return GameManager.getMessage<CombatEvadeMessageText>('COMBAT_EVADE', {
      defenderName: defender.name,
    });
  }

  private getAttackMessage(
    defender: Character | Enemy,
    damage: number,
    isCrit: boolean,
  ): string {
    if (isCrit) {
      return GameManager.getMessage<CombatAttackCritMessageText>(
        'COMBAT_ATTACK_CRIT',
        {
          defenderName: defender.name,
          dmg: damage,
          hp: defender.hp,
        },
      );
    }

    return GameManager.getMessage<CombatAttackMessageText>('COMBAT_ATTACK', {
      defenderName: defender.name,
      dmg: damage,
      hp: defender.hp,
    });
  }

  private didEvade(target: Character | Enemy): boolean {
    const eva = target.eva / 100;
    return Math.random() < eva;
  }

  private didCrit(attacker: Character | Enemy, type: Owner): boolean {
    const ctr =
      type === 'enemy'
        ? (attacker as Enemy).ctr / 100
        : (attacker as Character).ctr / 100;

    return Math.random() < ctr;
  }
}
