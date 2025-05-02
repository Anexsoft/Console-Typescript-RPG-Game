export const GAME_TEXTS_EN = {
  /* GAME */
  GAME_STATS_CHOOSE:
    'choose an attribute to improve ([c:grey]{{index}}[/]/{{availableStats}})',

  /* COMBAT */
  COMBAT_EVADE:
    'tries to strike, but [c:magenta]{{defenderName}}[/] swiftly dodges the attack.',
  COMBAT_ATTACK:
    'attacks [c:magenta]{{defenderName}}[/], dealing [c:red]{{dmg}} damage[/]. remaining hp: [c:grey]{{hp}}[/]',
  COMBAT_ATTACK_CRIT:
    'lands a [c:red]critical hit[/] on [c:magenta]{{defenderName}}[/], dealing [c:red]{{dmg}} damage[/]! remaining hp: [c:grey]{{hp}}[/]',
  COMBAT_WIN:
    'you defeated the enemy and earned [c:green]{{expPointsEarned}} experience points[/]!',
  COMBAT_WIN_GOLD:
    'you also found [c:yellow]{{goldEarned}} gold coins[/] on the battlefield.',
  COMBAT_LOSE: 'you were defeated in battle. train harder and try again!',

  COMBAT_ENEMY_APPEAR: '⚔️ a wild {{enemyName}} appears, ready to fight!',

  /* CHARACTER */
  CHARACTER_STATUS: 'level: {{level}} - hp: {{hp}}, mp: {{mp}}, exp: {{exp}}',

  CHARACTER_NEW_LEVEL_REACHED:
    '🎉 you leveled up! you are now level {{newLevel}}.',

  /* ENEMY */
  ENEMY_STATUS:
    'level: {{level}}, hp: {{hp}}, damage: {{dmg}}, evasion: {{eva}}%, crit chance: {{ctr}}%',

  /* SCENE > MAIN */
  MAIN_WELCOME: '🌟 welcome to your console rpg adventure 🌟',
  MAIN_WELCOME_INTRO:
    'you awaken in a dark castle... the wind howls and the moon lights the sky.',
  MAIN_CHARACTER_NAME: 'what is the name of your character?',
  MAIN_CHARACTER_CREATION: 'your character {{characterName}} has been created.',
  MAIN_CHARACTER_WELCOME_BACK:
    '🎮 welcome back, {{characterName}}! your journey continues...',

  /* SCENE > TOWN */
  TOWN_WHAT_TO_DO: 'you are in the main town. what would you like to do?',
  TOWN_GO_TO_INN: 'you head toward the inn to rest...',
  TOWN_GO_TO_STORE: 'you walk toward the store to check supplies...',
  TOWN_GO_TO_TAVERN: 'you enter the tavern, the smell of ale in the air...',
  TOWN_GO_TO_HUNT: 'you prepare for a hunt. stay alert...',

  /* SCENE > TOWN > INN */
  TOWN_INN_RESTED: 'you slept peacefully and feel [c:cyan]fully restored[/].',

  /* SCENE > COMBAT */
  FOREST_ENTERING_GOBLINGS: 'you enter the goblin forest. danger lurks ahead.',
  FOREST_ENTERING_GOLEM:
    'you step into the forest of golems. heavy footsteps echo in the distance.',
  FOREST_ENTERING_DRAGON:
    'you tread into the dragon’s domain. the air feels heavier...',
};
