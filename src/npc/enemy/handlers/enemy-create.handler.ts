import { ENEMY_STAT_FACTOR_PER_LEVEL } from '@game/engine/constants/enemy';

import { Enemy } from '@game/npc/enemy';
import { EnemyType } from '@game/npc/enemy/enemies.enum';
import enemyTypes from '@game/npc/enemy/enemies.json';
import { EnemyHandler } from '@game/npc/enemy/handlers/enemy.interfaces';
import { EnemyTypesConfig } from '@game/npc/enemy/index.types';

type EnemyStrength = 'weak' | 'strongest';

interface EnemyCreateHandlerInput {
  type: EnemyType;
  power: EnemyStrength;
}

export class EnemyCreateHandler
  implements EnemyHandler<EnemyCreateHandlerInput, Enemy>
{
  private readonly enemyTypes: EnemyTypesConfig = enemyTypes;

  handle({ type, power }: EnemyCreateHandlerInput): Enemy {
    const enemyBase = this.enemyTypes[type];

    if (!enemyBase) {
      throw new Error(`Enemy type "${type}" not found`);
    }

    const level = this.pickValue(enemyBase.level, power);

    const maxHp = this.scaleStat(this.pickValue(enemyBase.maxHp, power), level);
    const dmg = this.scaleStat(this.pickValue(enemyBase.dmg, power), level);
    const eva = Math.min(
      this.scaleStat(this.pickValue(enemyBase.eva, power), level),
      25,
    );
    const ctr = Math.min(
      this.scaleStat(this.pickValue(enemyBase.ctr, power), level),
      50,
    );
    const expGiven = this.scaleStat(
      this.pickValue(enemyBase.expGiven, power),
      level,
    );

    return new Enemy(enemyBase.name, {
      level,
      maxHp,
      dmg,
      eva,
      ctr,
      expGiven,
    });
  }

  private pickValue(range: number[], power: EnemyStrength): number {
    if (power === 'weak') return range[0];
    if (power === 'strongest') return range[range.length - 1];
    const index = Math.floor(Math.random() * range.length);
    return range[index];
  }

  private scaleStat(baseValue: number, level: number): number {
    if (level <= 1) return baseValue;
    const factor = 1 + (level - 1) * ENEMY_STAT_FACTOR_PER_LEVEL;
    return Math.floor(baseValue * factor);
  }
}
