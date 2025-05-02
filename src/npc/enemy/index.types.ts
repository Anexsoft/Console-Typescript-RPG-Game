export type EnemyConfig = {
  name: string;
  level: number[];
  maxHp: number[];
  dmg: number[];
  eva: number[];
  ctr: number[];
  expGiven: number[];
  goldGiven: number[];
};

export type EnemyTypesConfig = {
  [enemyType: string]: EnemyConfig;
};
