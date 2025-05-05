import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { CriticalHandler } from '@game/common/handlers/critical.handler';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  SpecialPowerCriticalPiercingStrikeMessageText,
  SpecialPowerPiercingStrikeMessageText,
} from '@game/engine/types/texts.types';

import {
  CHARACTER_SPECIAL_POWER_COSTS,
  CharacterSpecialPower,
} from '@game/character/types/special-power.types';

import { Enemy } from '@game/npc/enemy';

import { FightReportLog } from '../character-fight.handler';

export type PiercingStrikeHandlerInput = {
  character: Character;
  enemy: Enemy;
  logs: FightReportLog[];
};

export class PiercingStrikeHandler
  implements Handler<PiercingStrikeHandlerInput, void>
{
  private readonly criticalHandler = new CriticalHandler();

  handle({ character, enemy, logs }: PiercingStrikeHandlerInput): void {
    const powerData =
      CHARACTER_SPECIAL_POWER_COSTS[CharacterSpecialPower.PIERCING_STRIKE];

    character.mp -= powerData.mp;

    const { isCritical, damage } = this.criticalHandler.handle({
      ctr: character.ctr,
      dmg: character.dmg,
    });

    const finalDamage = Math.floor(
      damage * (powerData.effect.damageMultiplier || 1),
    );

    enemy.takeDamage(finalDamage);

    if (isCritical) {
      logs.push({
        who: DialoguerType.PLAYER,
        message:
          GameManager.getMessage<SpecialPowerCriticalPiercingStrikeMessageText>(
            'SPECIAL_POWER_CRITICAL_PIERCING_STRIKE',
            {
              enemyName: enemy.name,
              dmg: finalDamage,
              hp: enemy.hp,
            },
          ),
      });
    } else {
      logs.push({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<SpecialPowerPiercingStrikeMessageText>(
          'SPECIAL_POWER_PIERCING_STRIKE',
          {
            enemyName: enemy.name,
            dmg: finalDamage,
            hp: enemy.hp,
          },
        ),
      });
    }
  }
}
