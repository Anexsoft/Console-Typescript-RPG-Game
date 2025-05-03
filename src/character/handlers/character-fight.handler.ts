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

      this.executeCharacterAttackTurn(character, targetEnemy, logs);

      if (!targetEnemy.isAlive()) {
        aliveEnemies.shift();
      }

      for (const enemy of aliveEnemies) {
        if (enemy.isAlive() && character.hp > 0) {
          this.executeEnemyAttackTurn(enemy, character, logs);
        }
      }
    }

    return this.buildFightReport(character, enemies, logs);
  }

  private executeCharacterAttackTurn(
    attacker: Character,
    defender: Enemy,
    logs: FightReportLog[],
  ): void {
    if (this.didEvade(defender)) {
      logs.push({
        who: DialoguerType.PLAYER,
        message: this.getEvadeMessage(defender),
      });
      return;
    }

    const isCrit = this.didCrit(attacker, 'character');
    let damage = attacker.dmg;
    if (isCrit) damage *= 2;

    defender.takeDamage(damage);

    logs.push({
      who: DialoguerType.PLAYER,
      message: this.getAttackMessage(defender, damage, isCrit),
    });
  }

  private executeEnemyAttackTurn(
    attacker: Enemy,
    defender: Character,
    logs: FightReportLog[],
  ): void {
    if (this.didEvade(defender)) {
      logs.push({
        who: DialoguerType.ENEMY,
        message: this.getEvadeMessage(defender),
        enemyName: attacker.name,
      });
      return;
    }

    const isCrit = this.didCrit(attacker, 'enemy');
    let damage = attacker.dmg;
    if (isCrit) damage *= 2;

    defender.hp = Math.max(0, defender.hp - damage);

    logs.push({
      who: DialoguerType.ENEMY,
      message: this.getAttackMessage(defender, damage, isCrit),
      enemyName: attacker.name,
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

  private buildFightReport(
    character: Character,
    enemies: Enemy[],
    logs: FightReportLog[],
  ): FightReport {
    const winner = character.hp > 0 ? 'character' : 'enemy';

    let expPointsEarned = 0;
    let goldEarned = 0;

    if (winner === 'character') {
      expPointsEarned = enemies.reduce((acc, e) => acc + e.expGiven, 0);
      goldEarned = enemies.reduce((acc, e) => acc + e.goldGiven, 0);
    }

    return { winner, expPointsEarned, goldEarned, logs };
  }
}
