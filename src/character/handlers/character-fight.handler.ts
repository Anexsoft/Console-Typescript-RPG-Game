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

    let currentTurn = 1;

    while (character.hp > 0 && enemies.some((enemy) => enemy.isAlive())) {
      this.updateMessageTurn(currentTurn, logs);
      this.sortByLowestHpFirst(enemies);

      if (
        this.isSpecialPowerAvailable.handle({
          character,
          specialPower: character.specialPower,
          currentTurn,
        })
      ) {
        this.executeCharacterSpecialAttackTurn(character, enemies, logs);
      } else {
        this.characterAttackHandler.handle({
          attacker: character,
          defender: enemies[0],
          logs,
        });
      }

      for (const enemy of enemies.filter((enemy) => enemy.isAlive())) {
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

  private sortByLowestHpFirst(enemies: Enemy[]): void {
    enemies.sort((a, b) => {
      const aDead = a.hp <= 0 ? 1 : 0;
      const bDead = b.hp <= 0 ? 1 : 0;

      if (aDead !== bDead) return aDead - bDead;
      return a.hp - b.hp;
    });
  }

  private executeCharacterSpecialAttackTurn(
    character: Character,
    enemies: Enemy[],
    logs: FightReportLog[],
  ): void {
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
