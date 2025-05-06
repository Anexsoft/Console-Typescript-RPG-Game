import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import { SpecialPowerDragonsBreathMessageText } from '@game/engine/types/texts.types';

import { CHARACTER_SPECIAL_POWER_COSTS } from '@game/character/types/special-power-costs.types';
import { CharacterSpecialPower } from '@game/character/types/special-power.types';

import { Enemy } from '@game/npc/enemy';

import { FightReportLog } from '../character-fight.handler';

export type DragonsBreathHandlerInput = {
  character: Character;
  enemies: Enemy[];
  logs: FightReportLog[];
};

export class DragonsBreathHandler
  implements Handler<DragonsBreathHandlerInput, void>
{
  handle({ character, enemies, logs }: DragonsBreathHandlerInput): void {
    const powerData =
      CHARACTER_SPECIAL_POWER_COSTS[CharacterSpecialPower.DRAGONS_BREATH];

    character.mp -= powerData.mp;

    const damages = [];

    enemies.forEach((enemy) => {
      const percentDamage = Math.floor(
        enemy.hp * powerData.effect.minDamagePercent,
      );

      const finalDamage =
        Math.max(percentDamage, powerData.effect.baseDamage) +
        character.dmg * 0.7;

      enemy.takeDamage(finalDamage);
      damages.push(finalDamage);
    });

    logs.push({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<SpecialPowerDragonsBreathMessageText>(
        'SPECIAL_POWER_DRAGONS_BREATH',
        {
          maxDmg: Math.max(...damages),
        },
      ),
    });
  }
}
