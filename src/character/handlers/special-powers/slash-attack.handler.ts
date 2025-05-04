import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import { SpecialPowerSlashAttackMessageText } from '@game/engine/types/texts.types';

import {
  CHARACTER_SPECIAL_POWER_COSTS,
  CharacterSpecialPower,
} from '@game/character/types/special-power.types';

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
  handle({ character, enemies, logs }: SlashAttackHandlerInput): void {
    const powerData =
      CHARACTER_SPECIAL_POWER_COSTS[CharacterSpecialPower.SLASH_ATTACK];

    character.mp -= powerData.mp;

    const damage = Math.floor(
      character.dmg * (powerData.effect.damageMultiplier || 1),
    );

    enemies.forEach((enemy) => {
      enemy.takeDamage(damage);
    });

    logs.push({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<SpecialPowerSlashAttackMessageText>(
        'SPECIAL_POWER_SLASH_ATTACK',
        {
          dmg: damage,
        },
      ),
    });
  }
}
