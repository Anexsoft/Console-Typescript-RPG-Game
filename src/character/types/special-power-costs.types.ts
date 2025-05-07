import {
  CharacterSpecialPower,
  CharacterSpecialPowerCosts,
} from './special-power.types';

export const CHARACTER_SPECIAL_POWER_COSTS: CharacterSpecialPowerCosts = {
  [CharacterSpecialPower.DRAGONS_BREATH]: {
    price: 600,
    mp: 25,
    cooldownTurns: 4,
    description:
      'Unleashes a lethal inferno that burns all enemies, dealing the greater of 25% of their current HP or 100 base damage.',
    effect: {
      minDamagePercent: 0.35,
      baseDamage: 250,
    },
  },
  [CharacterSpecialPower.SLASH_ATTACK]: {
    price: 250,
    mp: 10,
    cooldownTurns: 3,
    description: 'Deals % damage to all enemies',
    effect: {
      damageMultiplier: 1.5,
    },
  },
  [CharacterSpecialPower.PIERCING_STRIKE]: {
    price: 100,
    mp: 15,
    cooldownTurns: 2,
    description:
      'a flurry of strikes that hits multiple times. Always hits at least twice, with a chance to land more.',
    effect: {
      minHits: 2,
      maxHits: 7,
      damageMultiplier: 0.25,
    },
  },
};
