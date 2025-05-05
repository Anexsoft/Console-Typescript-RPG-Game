export enum CharacterSpecialPower {
  SLASH_ATTACK = 'SLASH_ATTACK',
  PIERCING_STRIKE = 'PIERCING_STRIKE',
}

export type CharacterSpecialPowerEffect = {
  damageMultiplier?: number;
  targets?: 'allEnemies' | 'singleEnemy' | 'self' | 'allAllies';
  statusEffect?: 'stun' | 'burn' | 'poison' | 'heal' | 'none';
};

export type CharacterSpecialPowerData = {
  mp: number;
  cooldownTurns: number;
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
    description: 'Deals % damage to all enemies',
    effect: {
      damageMultiplier: 1.5,
      targets: 'allEnemies',
    },
  },
  [CharacterSpecialPower.PIERCING_STRIKE]: {
    mp: 7,
    cooldownTurns: 2,
    description:
      'A precise strike that deals double damage and cannot be evaded.',
    effect: {
      damageMultiplier: 2.0,
      targets: 'singleEnemy',
    },
  },
};
