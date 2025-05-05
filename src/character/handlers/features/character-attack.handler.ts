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

import { Enemy } from '@game/npc/enemy';

import { FightReportLog } from '../character-fight.handler';

export type CharacterAttackHandlerInput = {
  attacker: Character;
  defender: Enemy;
  logs: FightReportLog[];
};

export class CharacterAttackHandler
  implements Handler<CharacterAttackHandlerInput, void>
{
  private readonly criticalHandler = new CriticalHandler();
  private readonly evadeHandler = new EvadeHandler();

  handle({ attacker, defender, logs }: CharacterAttackHandlerInput): void {
    if (this.evadeHandler.handle(defender.eva)) {
      logs.push({
        who: DialoguerType.PLAYER,
        message: this.getEvadeMessage(defender),
        enemyName: defender.name,
      });
      return;
    }

    const { isCritical, damage } = this.criticalHandler.handle({
      ctr: attacker.ctr,
      dmg: attacker.dmg,
    });

    defender.takeDamage(damage);

    logs.push({
      who: DialoguerType.PLAYER,
      message: this.getAttackMessage(defender, damage, isCritical),
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

  private getEvadeMessage(defender: Character | Enemy): string {
    return GameManager.getMessage<CombatEvadeMessageText>('COMBAT_EVADE', {
      defenderName: defender.name,
    });
  }
}
