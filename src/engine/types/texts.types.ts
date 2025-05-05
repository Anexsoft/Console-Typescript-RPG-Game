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

/* SPECIAL POWERS */
export type SpecialPowerSlashAttackMessageText = {
  dmg: number;
};

export type SpecialPowerCriticalSlashAttackMessageText = {
  dmg: number;
};

export type SpecialPowerPiercingStrikeMessageText = {
  enemyName: string;
  dmg: number;
  hp: number;
};

export type SpecialPowerCriticalPiercingStrikeMessageText = {
  enemyName: string;
  dmg: number;
  hp: number;
};

/* CHARACTER */
export type CharacterCurrentStatusMessageText = {
  level: number;
  hp: number;
  mp: number;
  eva: number;
  ctr: number;
  exp: number;
};

export type CharacterCurrentGoldMessageText = {
  gold: number;
};

export type CharacterNewLevelReachedMessageText = {
  newLevel: number;
};

export type CharacterLevelUpPendingMessageText = {
  newLevel: number;
  pendingExperience: number;
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
