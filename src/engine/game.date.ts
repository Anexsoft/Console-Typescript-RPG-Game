import { REAL_DAY_PER_GAME_HOURS } from '@game/common/config';

export class GameDate {
  private static readonly GAME_MINUTES_PER_REAL_MS =
    (24 * 60) / (REAL_DAY_PER_GAME_HOURS * 60 * 60 * 1000);

  private get totalGameSeconds(): number {
    const elapsedMs = Date.now() - Date.now();
    return Math.floor(elapsedMs * GameDate.GAME_MINUTES_PER_REAL_MS * 60);
  }

  getHours(): number {
    return Math.floor(this.totalGameSeconds / 3600) % 24;
  }

  getMinutes(): number {
    return Math.floor(this.totalGameSeconds / 60) % 60;
  }

  getSeconds(): number {
    return this.totalGameSeconds % 60;
  }

  toString(): string {
    const h = this.getHours().toString().padStart(2, '0');
    const m = this.getMinutes().toString().padStart(2, '0');
    const s = this.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
}
