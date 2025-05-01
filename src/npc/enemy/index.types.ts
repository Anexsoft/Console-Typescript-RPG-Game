export type EnemyBase = {
  name: string;
  level: number[];
  maxHp: number[];
  dmg: number[];
  eva: number[];
  ctr: number[];
  expGiven: number[];
};

export type EnemyTypesConfig = {
  [enemyType: string]: EnemyBase;
};
