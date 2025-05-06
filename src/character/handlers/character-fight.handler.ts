import { Character } from '@game/character';

import { DialoguerType } from '@game/common/dialoguer';
import { Handler } from '@game/common/interfaces/handler.interfacer';

import { GameManager } from '@game/engine/game.manager';
import { CombatTurnMessageText } from '@game/engine/types/texts.types';

import { Enemy } from '@game/npc/enemy';
import { EnemyAttackHandler } from '@game/npc/enemy/handlers/features/enemy-attack.handler';

import { CharacterAttackHandler } from './features/character-attack.handler';
import { DragonsBreathHandler } from './special-powers/dragons-breath.handler';
import { PiercingStrikeHandler } from './special-powers/piercing-strike.handler';
import { SlashAttackHandler } from './special-powers/slash-attack.handler';
import { SpecialPowerIsAvailableHandler } from './special-powers/special-power-is-available.handler';

import { CharacterSpecialPower } from '../types/special-power.types';

type Owner = 'enemy' | 'character';

export type FightReport = {
  winner: Owner;
  expPointsEarned: number;
  goldEarned: number;
  logs: FightReportLog[];
};

export type FightReportLog = {
  who: DialoguerType;
  message: string;
  enemyName?: string;
};

type CharacterFightHandlerInput = {
  character: Character;
  enemies: Enemy[];
};

export class CharacterFightHandler
  implements Handler<CharacterFightHandlerInput, FightReport>
{
  private readonly characterAttackHandler = new CharacterAttackHandler();
  private readonly enemyAttackHandler = new EnemyAttackHandler();

  private readonly isSpecialPowerAvailable =
    new SpecialPowerIsAvailableHandler();

  private readonly specialPowers = {
    [CharacterSpecialPower.DRAGONS_BREATH]: new DragonsBreathHandler(),
    [CharacterSpecialPower.SLASH_ATTACK]: new SlashAttackHandler(),
    [CharacterSpecialPower.PIERCING_STRIKE]: new PiercingStrikeHandler(),
  };

  handle({ character, enemies }: CharacterFightHandlerInput): FightReport {
    const logs: FightReportLog[] = [];
    const aliveEnemies = [...enemies];

    let currentTurn = 1;

    while (character.hp > 0 && aliveEnemies.length > 0) {
      this.updateMessageTurn(currentTurn, logs);

      aliveEnemies.sort((a, b) => a.hp - b.hp);
      const targetEnemy = aliveEnemies[0];

      if (
        !this.tryToExecuteCharacterSpecialAttackTurn(
          character,
          enemies,
          aliveEnemies,
          currentTurn,
          logs,
        )
      ) {
        this.characterAttackHandler.handle({
          attacker: character,
          defender: targetEnemy,
          logs,
        });

        if (!targetEnemy.isAlive()) {
          aliveEnemies.shift();
        }
      }

      for (const enemy of aliveEnemies) {
        if (character.hp > 0) {
          this.enemyAttackHandler.handle({
            attacker: enemy,
            defender: character,
            logs,
          });
        }
      }

      currentTurn++;
    }

    return this.buildFightReport(character, enemies, logs);
  }

  private tryToExecuteCharacterSpecialAttackTurn(
    character: Character,
    enemies: Enemy[],
    aliveEnemies: Enemy[],
    currentTurn: number,
    logs: FightReportLog[],
  ): boolean {
    if (!character.specialPower) {
      return false;
    }

    const isEnabled = this.isSpecialPowerAvailable.handle({
      character,
      specialPower: character.specialPower,
      currentTurn,
    });

    if (isEnabled) {
      if (character.specialPower === CharacterSpecialPower.DRAGONS_BREATH) {
        this.specialPowers[CharacterSpecialPower.DRAGONS_BREATH].handle({
          character,
          enemies,
          logs,
        });
      }

      if (character.specialPower === CharacterSpecialPower.SLASH_ATTACK) {
        this.specialPowers[CharacterSpecialPower.SLASH_ATTACK].handle({
          character,
          enemies,
          logs,
        });
      }

      if (character.specialPower === CharacterSpecialPower.PIERCING_STRIKE) {
        this.specialPowers[CharacterSpecialPower.PIERCING_STRIKE].handle({
          character,
          enemy: enemies[0],
          logs,
        });
      }

      for (let i = aliveEnemies.length - 1; i >= 0; i--) {
        if (!aliveEnemies[i].isAlive()) {
          aliveEnemies.splice(i, 1);
        }
      }
    }

    return isEnabled;
  }

  private updateMessageTurn(turn: number, logs: FightReportLog[]): void {
    logs.push({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<CombatTurnMessageText>('COMBAT_TURN', {
        turn,
      }),
    });
  }

  private buildFightReport(
    character: Character,
    enemies: Enemy[],
    logs: FightReportLog[],
  ): FightReport {
    const winner = character.hp > 0 ? 'character' : 'enemy';

    let expPointsEarned = 0;
    let goldEarned = 0;

    if (winner === 'character') {
      expPointsEarned = enemies.reduce((acc, e) => acc + e.expGiven, 0);
      goldEarned = enemies.reduce((acc, e) => acc + e.goldGiven, 0);
    }

    return { winner, expPointsEarned, goldEarned, logs };
  }
}
