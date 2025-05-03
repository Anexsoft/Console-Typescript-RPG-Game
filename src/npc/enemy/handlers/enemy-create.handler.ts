import { Handler } from '@game/common/interfaces/handler.interfacer';

import {
  ENEMY_MAX_CTR,
  ENEMY_MAX_EVA,
  ENEMY_STAT_FACTOR_PER_LEVEL,
} from '@game/engine/constants/enemy';

import { Enemy } from '@game/npc/enemy';

import { ENEMIES_COLLECTION } from '../collection/enemy-stats.collection';
import { EnemyType } from '../collection/enemy-type.collection';

export class EnemyCreateHandler implements Handler<EnemyType, Enemy> {
  handle(type: EnemyType): Enemy {
    const enemyBase = ENEMIES_COLLECTION[type];

    if (!enemyBase) {
      throw new Error(`Enemy type "${type}" not found`);
    }

    const level = this.pickValue(enemyBase.level);

    return new Enemy(enemyBase.name, {
      level,
      maxHp: this.scaleValue(this.pickValue(enemyBase.maxHp), level),
      dmg: this.scaleValue(this.pickValue(enemyBase.dmg), level),
      eva: Math.min(
        this.scaleValue(this.pickValue(enemyBase.eva), level),
        ENEMY_MAX_EVA,
      ),
      ctr: Math.min(
        this.scaleValue(this.pickValue(enemyBase.ctr), level),
        ENEMY_MAX_CTR,
      ),
      expGiven: this.scaleValue(this.pickValue(enemyBase.expGiven), level),
      goldGiven: this.scaleValue(this.pickValue(enemyBase.goldGiven), level),
    });
  }

  private pickValue(range: number[]): number {
    const index = Math.floor(Math.random() * range.length);
    return range[index];
  }

  private scaleValue(baseValue: number, level: number): number {
    if (level <= 1) {
      return baseValue;
    }

    const factor = 1 + (level - 1) * ENEMY_STAT_FACTOR_PER_LEVEL;
    return Math.floor(baseValue * factor);
  }
}
