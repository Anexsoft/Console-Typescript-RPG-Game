export enum CharacterSpecialPower {
  SLASH_ATTACK = 'Slash Attack',
}

export type CharacterSpecialPowerType = 'area' | 'single' | 'buff' | 'debuff';

export type CharacterSpecialPowerEffect = {
  damageMultiplier?: number;
  targets?: 'allEnemies' | 'singleEnemy' | 'self' | 'allAllies';
  statusEffect?: 'stun' | 'burn' | 'poison' | 'heal' | 'none';
};

export type CharacterSpecialPowerData = {
  mp: number;
  cooldownTurns: number;
  type: CharacterSpecialPowerType;
  description: string;
  effect: CharacterSpecialPowerEffect;
};

export const CHARACTER_SPECIAL_POWER_COSTS: Record<
  CharacterSpecialPower,
  CharacterSpecialPowerData
> = {
  [CharacterSpecialPower.SLASH_ATTACK]: {
    mp: 5,
    cooldownTurns: 3,
    type: 'area',
    description: 'Deals % damage to all enemies',
    effect: {
      damageMultiplier: 1.5,
      targets: 'allEnemies',
    },
  },
};
