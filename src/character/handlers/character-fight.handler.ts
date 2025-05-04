import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  CombatAttackCritMessageText,
  CombatAttackMessageText,
  CombatEvadeMessageText,
  CombatTurnMessageText,
} from '@game/engine/types/texts.types';

import { Enemy } from '@game/npc/enemy';

import { SlashAttackHandler } from './special-powers/slash-attack.handler';
import { SpecialPowerIsAvailableHandler } from './special-powers/special-power-is-available.handler';

import { CharacterSpecialPower } from '../types/special-power.types';

type Owner = 'enemy' | 'character';

export type FightReport = {
  winner: Owner;
  expPointsEarned: number;
  goldEarned: number;
  logs: FightReportLog[];
};

export type FightReportLog = {
  who: DialoguerType;
  message: string;
  enemyName?: string;
};

type CharacterFightHandlerInput = {
  character: Character;
  enemies: Enemy[];
};

export class CharacterFightHandler
  implements Handler<CharacterFightHandlerInput, FightReport>
{
  private readonly isSpecialPowerAvailable =
    new SpecialPowerIsAvailableHandler();

  private readonly specialPowers = {
    [CharacterSpecialPower.SLASH_ATTACK]: new SlashAttackHandler(),
  };

  handle({ character, enemies }: CharacterFightHandlerInput): FightReport {
    const logs: FightReportLog[] = [];
    let aliveEnemies = [...enemies];

    let currentTurn = 1;

    while (character.hp > 0 && aliveEnemies.length > 0) {
      this.updateMessageTurn(currentTurn, logs);

      if (
        this.isSpecialPowerAvailable.handle({
          character,
          specialPower: CharacterSpecialPower.SLASH_ATTACK,
          currentTurn,
        })
      ) {
        this.specialPowers[CharacterSpecialPower.SLASH_ATTACK].handle({
          character,
          enemies,
          logs,
        });

        aliveEnemies = aliveEnemies.filter((enemy) => enemy.isAlive());
      } else {
        const targetEnemy = aliveEnemies[0];
        this.executeCharacterAttackTurn(character, targetEnemy, logs);

        if (!targetEnemy.isAlive()) {
          aliveEnemies.shift();
        }
      }

      for (const enemy of aliveEnemies) {
        if (character.hp > 0) {
          this.executeEnemyAttackTurn(enemy, character, logs);
        }
      }

      currentTurn++;
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

  private updateMessageTurn(turn: number, logs: FightReportLog[]): void {
    logs.push({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<CombatTurnMessageText>('COMBAT_TURN', {
        turn,
      }),
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
