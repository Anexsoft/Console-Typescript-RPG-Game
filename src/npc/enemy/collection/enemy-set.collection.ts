import { EnemyLocation } from './enemy-location.collection';
import { EnemyType } from './enemy-type.collection';

export const ENEMY_SET = {
  [EnemyLocation.SLIME_FIELDS]: [
    [EnemyType.SLIME, EnemyType.SLIME, EnemyType.BAT],
    [EnemyType.SLIME, EnemyType.BAT, EnemyType.RAT],
  ],
  [EnemyLocation.ABANDONED_FARM]: [
    [EnemyType.RAT, EnemyType.RAT, EnemyType.ZOMBIE],
    [EnemyType.RAT, EnemyType.ZOMBIE, EnemyType.SKELETON],
  ],
  [EnemyLocation.RAT_CAVES]: [
    [EnemyType.RAT, EnemyType.IMP, EnemyType.RAT],
    [EnemyType.RAT, EnemyType.IMP, EnemyType.SKELETON],
  ],
  [EnemyLocation.SPIDER_NEST]: [
    [EnemyType.SPIDER, EnemyType.SPIDER, EnemyType.BAT],
    [EnemyType.SPIDER, EnemyType.IMP, EnemyType.BANDIT],
    [EnemyType.HARPY, EnemyType.SPIDER, EnemyType.BANDIT],
  ],
  [EnemyLocation.GOBLIN_CAMP]: [
    [EnemyType.GOBLIN, EnemyType.GOBLIN, EnemyType.BANDIT],
    [EnemyType.GOBLIN, EnemyType.GOBLIN, EnemyType.GOBLIN, EnemyType.BANDIT],
  ],
  [EnemyLocation.CURSED_GRAVEYARD]: [
    [EnemyType.SKELETON, EnemyType.ZOMBIE, EnemyType.WRAITH],
    [EnemyType.WRAITH, EnemyType.NECROMANCER, EnemyType.ZOMBIE],
  ],
  [EnemyLocation.BANDIT_HILLS]: [
    [EnemyType.BANDIT, EnemyType.WOLF, EnemyType.BANDIT],
    [EnemyType.BANDIT, EnemyType.ORC, EnemyType.WOLF],
  ],
  [EnemyLocation.TROLL_BRIDGE]: [
    [EnemyType.TROLL, EnemyType.WOLF, EnemyType.OGRE],
    [EnemyType.TROLL, EnemyType.OGRE, EnemyType.ORC],
  ],
  [EnemyLocation.DEMONIC_ALTAR]: [
    [EnemyType.IMP, EnemyType.DEMON, EnemyType.NECROMANCER],
    [EnemyType.DEMON, EnemyType.WRAITH, EnemyType.DARK_KNIGHT],
  ],
  [EnemyLocation.DRAGON_PEAK]: [
    [EnemyType.LICH, EnemyType.LICH, EnemyType.DARK_KNIGHT],
    [EnemyType.DRAGON, EnemyType.LICH, EnemyType.LICH],
  ],
};
