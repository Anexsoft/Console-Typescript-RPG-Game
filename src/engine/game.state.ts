import { Character } from '@game/character';

import { GameDate } from './game.date';

export class GameState {
  private static _character: Character | undefined;
  private static _time = new GameDate();

  static setCharacter(character: Character): void {
    if (this._character) {
      throw new Error('character has already been set.');
    }

    this._character = character;
  }

  static get character(): Character | undefined {
    return this._character;
  }

  static get time(): GameDate {
    return this._time;
  }
}
