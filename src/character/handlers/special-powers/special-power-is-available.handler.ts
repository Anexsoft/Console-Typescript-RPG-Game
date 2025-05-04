import { Character } from '@game/character';

import { Handler } from '@game/common/interfaces/handler.interfacer';

import {
  CHARACTER_SPECIAL_POWER_COSTS,
  CharacterSpecialPower,
} from '@game/character/types/special-power.types';

export type SpecialPowerIsAvailableHandlerInput = {
  specialPower: CharacterSpecialPower;
  character: Character;
  currentTurn: number;
};

export class SpecialPowerIsAvailableHandler
  implements Handler<SpecialPowerIsAvailableHandlerInput, void>
{
  handle({
    character,
    specialPower,
    currentTurn,
  }: SpecialPowerIsAvailableHandlerInput): boolean {
    const powerData = CHARACTER_SPECIAL_POWER_COSTS[specialPower];

    if (!powerData) {
      throw new Error('Invalida special power supplied');
    }

    const hasEnoughMp = character.mp >= powerData.mp;
    const cooldownReady = currentTurn % powerData.cooldownTurns === 0;

    return hasEnoughMp && cooldownReady;
  }
}
