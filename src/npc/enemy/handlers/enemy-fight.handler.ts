import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';

import { Enemy } from '@game/npc/enemy';
import { EnemyHandler } from '@game/npc/enemy/handlers/enemy.interfaces';

export type FightReport = {
  winner: 'character' | 'enemy';
  expPointsEarned: number;
  logs: FightReportLog[];
};

type FightReportLog = {
  who: DialoguerType;
  message: string;
};

type EnemyFightHandlerInput = {
  character: Character;
  enemy: Enemy;
};

type Owner = 'enemy' | 'character';

export class EnemyFightHandler
  implements EnemyHandler<EnemyFightHandlerInput, FightReport>
{
  handle({ character, enemy }: EnemyFightHandlerInput): FightReport {
    const logs: FightReportLog[] = [];

    while (character.hp > 0 && enemy.isAlive()) {
      this.executeTurn(character, enemy, logs, 'character');

      if (!enemy.isAlive()) {
        break;
      }

      this.executeTurn(enemy, character, logs, 'enemy');
    }

    const winner = character.hp > 0 ? 'character' : 'enemy';
    const expPointsEarned = winner === 'character' ? enemy.expGiven : 0;

    return { winner, expPointsEarned, logs };
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
        message: `intenta atacar, pero ${defender.name} esquiva el golpe.`,
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
      message: `ataca a ${defender.name} causando ${Math.floor(damage)} de daño.${isCrit ? ' ¡Golpe crítico!' : ''} Vida restante: ${defender.hp}.`,
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
