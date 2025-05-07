export const GAME_TEXTS = {
  /* GAME */
  GAME_STATS_CHOOSE:
    'choose an attribute to improve ([c:grey]{{index}}[/]/{{availableStats}})',

  /* COMBAT */
  COMBAT_EVADE:
    'tries to strike, but [c:magenta]{{defenderName}}[/] swiftly dodges the attack',
  COMBAT_ATTACK:
    'attacks [c:magenta]{{defenderName}}[/], dealing [c:red]{{dmg}} damage[/]. Remaining HP: [c:grey]{{hp}}[/]/{{maxHp}}',
  COMBAT_ATTACK_CRIT:
    'lands a [c:red]critical hit[/] on [c:magenta]{{defenderName}}[/], dealing [c:red]{{dmg}} damage[/]! Remaining HP: [c:grey]{{hp}}[/]/{{maxHp}}',
  COMBAT_WIN:
    'you defeated the enemy and earned [c:green]{{expPointsEarned}} experience points[/]!',
  COMBAT_WIN_GOLD:
    'you also found [c:yellow]{{goldEarned}} gold coins[/] on the battlefield',
  COMBAT_LOSE: 'you were defeated in battle. Train harder and try again!',
  COMBAT_ENEMY_APPEAR: 'a wild {{enemyName}} appears, ready to fight!',
  COMBAT_TURN: '--------- turn {{turn}} begins ---------',

  /* SPECIAL POWERS */
  SPECIAL_POWER_DRAGONS_BREATH:
    "unleashes the lethal [c:yellow]Dragon's Breath[/], scorching all enemies for up to [c:red]{{maxDmg}} damage[/]!",

  SPECIAL_POWER_SLASH_ATTACK:
    'unleashes [c:yellow]Slash Attack[/] on all enemies, dealing [c:red]{{dmg}} damage[/] each!',
  SPECIAL_POWER_CRITICAL_SLASH_ATTACK:
    'unleashes a devastating [c:yellow]CRITICAL Slash Attack[/], hitting all enemies with [c:red]{{dmg}} damage[/] each!',

  SPECIAL_POWER_PIERCING_STRIKE:
    'uses [c:yellow]Piercing Strike[/] and hits [c:magenta]{{hits}}[/] times, dealing [c:red]{{dmg}} damage[/] to [c:magenta]{{enemyName}}[/]! Remaining HP: [c:grey]{{hp}}[/]/{{maxHp}}',
  SPECIAL_POWER_CRITICAL_PIERCING_STRIKE:
    'unleashes a deadly [c:yellow]CRITICAL Piercing Strike[/], hitting [c:magenta]{{hits}}[/] times and inflicting [c:red]{{dmg}} damage[/] on [c:magenta]{{enemyName}}[/]! Remaining HP: [c:grey]{{hp}}[/]/{{maxHp}}',

  /* CHARACTER */
  CHARACTER_CURRENT_STATUS:
    'level: {{level}} - HP: {{hp}}, MP: {{mp}}, DMG: {{dmg}}, RES: {{res}}%, EVA: {{eva}}%, CTR: {{ctr}}%',
  CHARACTER_CURRENT_GOLD:
    'you currently carry [c:yellow]{{gold}} gold coins[/]',
  CHARACTER_LEVEL_UP_PENDING:
    'you need [c:grey]{{pendingExperience}} experience points[/] to reach [c:green]level {{newLevel}}[/]',
  CHARACTER_NEW_LEVEL_REACHED:
    '🎉 you leveled up! You are now [c:green]level {{newLevel}}[/]!',
  CHARACTER_MAX_LEVEL_REACHED:
    'you have reached the maximum level. No further progression is possible',

  /* ENEMY */
  ENEMY_STATUS:
    'level: {{level}}, HP: {{hp}}, DMG: {{dmg}}, EVA: {{eva}}%, CTR: {{ctr}}%',

  /* SCENE > MAIN */
  MAIN_WELCOME: '🌟 welcome to your console RPG adventure 🌟',
  MAIN_WELCOME_INTRO:
    'you awaken in a dark castle... The wind howls and the moon lights the sky',
  MAIN_CHARACTER_NAME: 'what is the name of your character?',
  MAIN_CHARACTER_CREATION: 'your character {{characterName}} has been created',
  MAIN_CHARACTER_WELCOME_BACK:
    '🎮 welcome back, {{characterName}}! Your journey continues...',

  /* SCENE > TOWN */
  TOWN_WHAT_TO_DO: 'you are in the main town. What would you like to do?',
  TOWN_GO_TO_INN: 'you head toward the inn to rest...',
  TOWN_GO_TO_STORE: 'you walk toward the store to check supplies...',
  TOWN_GO_TO_TAVERN: 'you enter the tavern, the smell of ale in the air...',
  TOWN_GO_TO_HUNT: 'you prepare for a hunt. Stay alert...',

  /* SCENE > TOWN > INN */
  TOWN_INN_RESTED: 'you slept peacefully and feel [c:green]fully restored[/]',

  /* SCENE > TOWN > STORE */
  TOWN_STORE_CLOSE:
    'the store is currently closed. You have already acquired all available powers.',
  TOWN_STORE_PURCHASE:
    'welcome! Choose a special power to aid you in your upcoming battles.',
  TOWN_STORE_PURCHASE_ENOUGH_MONEY:
    'you dont have [c:grey]enough gold[/] to purchase this power',
  TOWN_STORE_PURCHASE_SUCCESFUL:
    'you have [c:green]successfully[/] purchased a new special power!',

  /* SCENE > COMBAT */
  COMBAT_ENTERING_MESSAGE:
    'you have entered [c:magenta]{{locationName}}[/]. Be careful...',
};
