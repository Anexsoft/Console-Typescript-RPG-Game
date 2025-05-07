export enum CharacterSpecialPower {
  SLASH_ATTACK = 'SLASH_ATTACK',
  PIERCING_STRIKE = 'PIERCING_STRIKE',
  DRAGONS_BREATH = 'DRAGONS_BREATH',
}

export type CharacterSpecialMultiplierPowerEffect = {
  damageMultiplier: number;
};

export type CharacterSpecialMultipleHitsPowerEffect = {
  minHits: number;
  maxHits: number;
  damageMultiplier: number;
};

export type CharacterSpecialEnemyLifePowerEffect = {
  minDamagePercent: number;
  baseDamage: number;
};

export type CharacterSpecialPowerData<EffectType> = {
  price: number;
  mp: number;
  cooldownTurns: number;
  description: string;
  effect: EffectType;
};

export type CharacterSpecialPowerCosts = {
  [CharacterSpecialPower.DRAGONS_BREATH]: CharacterSpecialPowerData<CharacterSpecialEnemyLifePowerEffect>;
  [CharacterSpecialPower.SLASH_ATTACK]: CharacterSpecialPowerData<CharacterSpecialMultiplierPowerEffect>;
  [CharacterSpecialPower.PIERCING_STRIKE]: CharacterSpecialPowerData<CharacterSpecialMultipleHitsPowerEffect>;
};
