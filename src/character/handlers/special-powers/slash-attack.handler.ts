import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { CriticalHandler } from '@game/common/handlers/critical.handler';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  SpecialPowerCriticalSlashAttackMessageText,
  SpecialPowerSlashAttackMessageText,
} from '@game/engine/types/texts.types';

import { CHARACTER_SPECIAL_POWER_COSTS } from '@game/character/types/special-power-costs.types';
import { CharacterSpecialPower } from '@game/character/types/special-power.types';

import { Enemy } from '@game/npc/enemy';

import { FightReportLog } from '../character-fight.handler';

export type SlashAttackHandlerInput = {
  character: Character;
  enemies: Enemy[];
  logs: FightReportLog[];
};

export class SlashAttackHandler
  implements Handler<SlashAttackHandlerInput, void>
{
  private readonly criticalHandler = new CriticalHandler();

  handle({ character, enemies, logs }: SlashAttackHandlerInput): void {
    const powerData =
      CHARACTER_SPECIAL_POWER_COSTS[CharacterSpecialPower.SLASH_ATTACK];

    character.mp -= powerData.mp;

    const { isCritical, damage } = this.criticalHandler.handle({
      ctr: character.ctr,
      dmg: character.dmg,
    });

    const finalDamage = Math.floor(
      damage * (powerData.effect.damageMultiplier || 1),
    );

    enemies.forEach((enemy) => {
      enemy.takeDamage(finalDamage);
    });

    if (isCritical) {
      logs.push({
        who: DialoguerType.PLAYER,
        message:
          GameManager.getMessage<SpecialPowerCriticalSlashAttackMessageText>(
            'SPECIAL_POWER_CRITICAL_SLASH_ATTACK',
            {
              dmg: finalDamage,
            },
          ),
      });
    } else {
      logs.push({
        who: DialoguerType.PLAYER,
        message: GameManager.getMessage<SpecialPowerSlashAttackMessageText>(
          'SPECIAL_POWER_SLASH_ATTACK',
          {
            dmg: finalDamage,
          },
        ),
      });
    }
  }
}
