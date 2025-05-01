export type EnemyReward = {
  exp: number;
};

export class Enemy {
  /** Enemy's name */
  name: string;

  /** Hit Points */
  hp: number;

  /** Max Hit Points */
  maxHp: number;

  /** Damage output */
  dmg: number;

  /** Evasion chance (%) */
  eva: number;

  /** Critical hit chance (%) */
  ctr: number;

  /** Experience points granted when defeated */
  expGiven: number;

  /** Enemy's level */
  level: number;

  constructor(
    name: string,
    options: {
      maxHp: number;
      dmg: number;
      eva: number;
      ctr: number;
      expGiven: number;
      level: number;
    },
  ) {
    this.name = name;
    this.maxHp = options.maxHp;
    this.hp = options.maxHp;
    this.dmg = options.dmg;
    this.eva = options.eva;
    this.ctr = options.ctr;
    this.expGiven = options.expGiven;
    this.level = options.level;
  }

  /** Returns true if the enemy is still alive */
  isAlive(): boolean {
    return this.hp > 0;
  }

  /** Apply damage to the enemy */
  takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  /** Returns the reward after defeat (for now: only experience) */
  getReward(): EnemyReward {
    return { exp: this.expGiven };
  }
}
