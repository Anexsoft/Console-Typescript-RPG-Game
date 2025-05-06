import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { CriticalHandler } from '@game/common/handlers/critical.handler';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import {
  SpecialPowerCriticalPiercingStrikeMessageText,
  SpecialPowerPiercingStrikeMessageText,
} from '@game/engine/types/texts.types';

import { CHARACTER_SPECIAL_POWER_COSTS } from '@game/character/types/special-power-costs.types';
import { CharacterSpecialPower } from '@game/character/types/special-power.types';

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

    const { minHits, maxHits } = powerData.effect;

    const totalHits = this.getWeightedHitCount(minHits, maxHits);
    let totalDamage = 0;
    let anyCritical = false;

    for (let i = 0; i < totalHits; i++) {
      const { isCritical, damage } = this.criticalHandler.handle({
        ctr: character.ctr,
        dmg: character.dmg,
      });

      const hitDamage = Math.floor(damage);

      enemy.takeDamage(hitDamage);
      totalDamage += hitDamage;

      if (isCritical) {
        anyCritical = true;
      }
    }

    const messageKey = anyCritical
      ? 'SPECIAL_POWER_CRITICAL_PIERCING_STRIKE'
      : 'SPECIAL_POWER_PIERCING_STRIKE';

    logs.push({
      who: DialoguerType.PLAYER,
      message: GameManager.getMessage<
        | SpecialPowerCriticalPiercingStrikeMessageText
        | SpecialPowerPiercingStrikeMessageText
      >(messageKey, {
        enemyName: enemy.name,
        dmg: totalDamage,
        hp: enemy.hp,
        maxHp: enemy.maxHp,
        hits: totalHits,
      }),
    });
  }

  private getWeightedHitCount(min: number, max: number): number {
    const weights: number[] = [];

    for (let i = min; i <= max; i++) {
      const weight = 1 / (i - min + 1);
      weights.push(weight);
    }

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const rand = Math.random() * totalWeight;

    let acc = 0;
    for (let i = 0; i < weights.length; i++) {
      acc += weights[i];
      if (rand <= acc) {
        return min + i;
      }
    }

    return max;
  }
}
