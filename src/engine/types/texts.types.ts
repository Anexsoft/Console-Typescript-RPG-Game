import { EnemyLocation } from '@game/npc/enemy/collection/enemy-location.collection';

import { GAME_TEXTS } from '../constants/texts';

/* GAME */
export type GameStatsChooseMessage = {
  index: number;
  availableStats: number;
};

/* COMBAT */
export type CombatEvadeMessageText = {
  defenderName: string;
};

export type CombatAttackMessageText = {
  defenderName: string;
  dmg: number;
  hp: number;
};

export type CombatAttackCritMessageText = {
  defenderName: string;
  dmg: number;
  hp: number;
};

export type CombatWinMessageText = {
  expPointsEarned: number;
};

export type CombatWinGoldMessageText = {
  goldEarned: number;
};

export type CombatEnemyAppearMessageText = {
  enemyName: string;
};

export type CombatTurnMessageText = {
  turn: number;
};

/* CHARACTER */
export type CharacterStatusMessageText = {
  level: number;
  hp: number;
  mp: number;
  eva: number;
  ctr: number;
  exp: number;
};

export type CharacterNewLevelReachedMessageText = {
  newLevel: number;
};

/* ENEMY */
export type EnemyStatusMessageText = {
  level: number;
  hp: number;
  dmg: number;
  eva: number;
  ctr: number;
};

/* SCENE > MAIN */
export type MainCharacterCreationMessageText = {
  characterName: string;
};

export type MainCharacterWelcomeBackMessageText = {
  characterName: string;
};

/* FIGHT */
export type CombatEnteringMessageText = {
  locationName: EnemyLocation;
};

export type GAME_TEXTS_TYPES = keyof typeof GAME_TEXTS;
