export enum CharacterSpecialPower {
  SLASH_ATTACK = 'Slash Attack',
}

export const CHARACTER_SPECIAL_POWER_COSTS = {
  [CharacterSpecialPower.SLASH_ATTACK]: {
    mp: 5,
    turns: 1,
  },
};
