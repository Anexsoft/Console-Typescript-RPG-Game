import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { CriticalHandler } from '@game/common/handlers/critical.handler';
import { EvadeHandler } from '@game/common/handlers/evade.handler';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  CombatAttackCritMessageText,
  CombatAttackMessageText,
  CombatEvadeMessageText,
} from '@game/engine/types/texts.types';

import { FightReportLog } from '@game/character/handlers/character-fight.handler';
import { CharacterReceiveDamageHandler } from '@game/character/handlers/features/character-receive-damage.handler';

import { Enemy } from '@game/npc/enemy';

export type EnemyAttackHandlerInput = {
  attacker: Enemy;
  defender: Character;
  logs: FightReportLog[];
};

export class EnemyAttackHandler
  implements Handler<EnemyAttackHandlerInput, void>
{
  private readonly characterReceiveDamageHandler =
    new CharacterReceiveDamageHandler();
  private readonly criticalHandler = new CriticalHandler();
  private readonly evadeHandler = new EvadeHandler();

  handle({ attacker, defender, logs }: EnemyAttackHandlerInput): void {
    if (this.evadeHandler.handle(defender.eva)) {
      logs.push({
        who: DialoguerType.ENEMY,
        message: this.getEvadeMessage(defender),
        enemyName: attacker.name,
      });
      return;
    }

    const { isCritical, damage } = this.criticalHandler.handle({
      ctr: attacker.ctr,
      dmg: attacker.dmg,
    });

    this.characterReceiveDamageHandler.handle({
      character: defender,
      dmg: damage,
    });

    logs.push({
      who: DialoguerType.ENEMY,
      message: this.getAttackMessage(defender, damage, isCritical),
      enemyName: attacker.name,
    });
  }

  private getAttackMessage(
    defender: Character,
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

  private getEvadeMessage(defender: Character): string {
    return GameManager.getMessage<CombatEvadeMessageText>('COMBAT_EVADE', {
      defenderName: defender.name,
    });
  }
}
