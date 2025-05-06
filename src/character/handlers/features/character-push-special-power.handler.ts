import { Character } from '@game/character';

import { Handler } from '@game/common/interfaces/handler.interfacer';

import { CharacterSpecialPower } from '@game/character/types/special-power.types';

export type CharacterPushSpecialPowerHandlerInput = {
  character: Character;
  specialPower: CharacterSpecialPower;
};

export class CharacterPushSpecialPowerHandler
  implements Handler<CharacterPushSpecialPowerHandlerInput, void>
{
  handle({
    character,
    specialPower,
  }: CharacterPushSpecialPowerHandlerInput): void {
    const alreadyHasPower = character.specialPowers.includes(specialPower);

    if (!alreadyHasPower) {
      character.specialPowers.push(specialPower);
    }
  }
}
