import { Handler } from '@game/common/interfaces/handler.interfacer';

export class EvadeHandler implements Handler<number, boolean> {
  handle(eva: number): boolean {
    return Math.random() < eva / 100;
  }
}
