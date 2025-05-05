import { Character } from '@game/character';

import { CriticalHandler } from '@game/common/handlers/critical.handler';
import { EvadeHandler } from '@game/common/handlers/evade.handler';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { CharacterSpecialPower } from '@game/character/types/special-power.types';

export type CharacterUpdateSpecialPowerHandlerInput = {
  character: Character;
  specialPower: CharacterSpecialPower;
};

export class CharacterUpdateSpecialPowerHandler
  implements Handler<CharacterUpdateSpecialPowerHandlerInput, void>
{
  private readonly criticalHandler = new CriticalHandler();
  private readonly evadeHandler = new EvadeHandler();

  handle({
    character,
    specialPower,
  }: CharacterUpdateSpecialPowerHandlerInput): void {
    character.specialPower = specialPower;
  }
}
