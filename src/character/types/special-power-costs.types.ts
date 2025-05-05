import {
  CharacterSpecialPower,
  CharacterSpecialPowerCosts,
} from './special-power.types';

export const CHARACTER_SPECIAL_POWER_COSTS: CharacterSpecialPowerCosts = {
  [CharacterSpecialPower.DRAGONS_BREATH]: {
    mp: 30,
    cooldownTurns: 4,
    description:
      'Unleashes a lethal inferno that burns all enemies, dealing the greater of 25% of their current HP or 100 base damage.',
    effect: {
      minDamagePercent: 0.25,
      baseDamage: 100,
    },
  },
  [CharacterSpecialPower.SLASH_ATTACK]: {
    mp: 5,
    cooldownTurns: 3,
    description: 'Deals % damage to all enemies',
    effect: {
      damageMultiplier: 1.5,
    },
  },
  [CharacterSpecialPower.PIERCING_STRIKE]: {
    mp: 7,
    cooldownTurns: 2,
    description:
      'A precise strike that deals double damage and cannot be evaded.',
    effect: {
      damageMultiplier: 2.0,
    },
  },
};
