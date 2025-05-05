import { Handler } from '@game/common/interfaces/handler.interfacer';

type CriticalHandlerInput = {
  ctr: number;
  dmg: number;
};

type CriticalHandlerResponse = {
  isCritical: boolean;
  damage: number;
};

export class CriticalHandler
  implements Handler<CriticalHandlerInput, CriticalHandlerResponse>
{
  handle({ ctr, dmg }: CriticalHandlerInput): CriticalHandlerResponse {
    const isCritical = Math.random() < ctr / 100;

    if (isCritical) {
      dmg = dmg * 2;
    }

    return {
      isCritical,
      damage: dmg,
    };
  }
}
