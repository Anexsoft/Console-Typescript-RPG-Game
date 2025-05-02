import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';

import { GameManager } from '@game/engine/game.manager';
import {
  CombatAttackCritMessageText,
  CombatAttackMessageText,
  CombatEvadeMessageText,
} from '@game/engine/types/texts.types';

import { Enemy } from '@game/npc/enemy';
import { EnemyHandler } from '@game/npc/enemy/handlers/enemy.interfaces';

export type FightReport = {
  winner: 'character' | 'enemy';
  expPointsEarned: number;
  goldEarned: number;
  logs: FightReportLog[];
};

type FightReportLog = {
  who: DialoguerType;
  message: string;
};

type CombatHandlerInput = {
  character: Character;
  enemy: Enemy;
};

type Owner = 'enemy' | 'character';

export class CombatHandler
  implements EnemyHandler<CombatHandlerInput, FightReport>
{
  handle({ character, enemy }: CombatHandlerInput): FightReport {
    const logs: FightReportLog[] = [];

    while (character.hp > 0 && enemy.isAlive()) {
      this.executeTurn(character, enemy, logs, 'character');

      if (!enemy.isAlive()) {
        break;
      }

      this.executeTurn(enemy, character, logs, 'enemy');
    }

    const winner = character.hp > 0 ? 'character' : 'enemy';

    let expPointsEarned = 0;
    let goldEarned = 0;

    if (winner === 'character') {
      expPointsEarned = enemy.expGiven;
      goldEarned = enemy.goldGiven;
    }

    return { winner, expPointsEarned, goldEarned, logs };
  }

  private executeTurn(
    attacker: Character | Enemy,
    defender: Character | Enemy,
    logs: FightReportLog[],
    type: Owner,
  ): void {
    const dialoguerType =
      type === 'character' ? DialoguerType.PLAYER : DialoguerType.ENEMY;

    if (this.didEvade(defender)) {
      logs.push({
        who: dialoguerType,
        message: this.getEvadeMessage(defender),
      });

      return;
    }

    const isCrit = this.didCrit(attacker, type);
    let damage = attacker.dmg;
    if (isCrit) {
      damage *= 2;
    }

    if (defender instanceof Enemy) {
      defender.takeDamage(damage);
    } else {
      defender.hp = Math.max(0, defender.hp - damage);
    }

    logs.push({
      who: dialoguerType,
      message: this.getAttackMessage(defender, damage, isCrit),
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
    const eva = target instanceof Enemy ? target.eva / 100 : target.eva;
    return Math.random() < eva;
  }

  private didCrit(attacker: Character | Enemy, type: Owner): boolean {
    const ctr =
      type === 'enemy'
        ? (attacker as Enemy).ctr / 100
        : (attacker as Character).ctr;

    return Math.random() < ctr;
  }
}
