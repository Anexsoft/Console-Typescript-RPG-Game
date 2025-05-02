export const GAME_TEXTS = {
  /* GAME */
  GAME_STATS_CHOOSE:
    'elige un atributo para mejorar ([c:grey]{{index}}[/]/{{availableStats}}',

  /* COMBAT */
  COMBAT_EVADE:
    'intenta atacar, pero [c:magenta]{{defenderName}}[/] esquiva el golpe.',
  COMBAT_ATTACK:
    'ataca a [c:magenta]{{defenderName}}[/], infligiendo [c:red]{{dmg}} de daño[/]. Vida restante de {{defenderName}}: [c:grey]{{hp}}[/]',
  COMBAT_ATTACK_CRIT:
    'ataca a [c:magenta]{{defenderName}}[/], infligiendo [c:red]{{dmg}} de daño[/] crítico. Vida restante de {{defenderName}}: [c:grey]{{hp}}[/]',
  COMBAT_WIN:
    '¡Has ganado el combate y obtuviste [c:cyan]{{expPointsEarned}} puntos de experiencia[/]!',
  COMBAT_WIN_GOLD: 'también ganaste [c:yellow]{{goldEarned}} monedas de oro[/]',
  COMBAT_LOSE:
    'has perdido este combate. Prepárate más y vuelve a intentarlo !!',

  COMBAT_ENEMY_APPEAR: '⚔️ ¡{{enemyName}} salvaje ha aparecido!',

  /* CHARACTER */
  CHARACTER_STATUS: 'nivel: {{level}} - HP: {{hp}}, MP: {{mp}}, EXP: {{exp}}',

  CHARACTER_NEW_LEVEL_REACHED: '🎉 ¡Has alcanzado el nivel {{newLevel}}!',

  /* ENEMY */
  ENEMY_STATUS:
    'nivel: {{level}}, HP: {{hp}}, Daño: {{dmg}}, Evasión: {{eva}}%, Crítico: {{ctr}}%',

  /* SCENE > MAIN */
  MAIN_WELCOME: '🌟 Bienvenido a tu RPG por consola 🌟',
  MAIN_WELCOME_INTRO:
    'Comenzamos la aventura en un oscuro castillo... El viento sopla con fuerza y la luna brilla intensamente.',
  MAIN_CHARACTER_NAME: 'ingresa el nombre de tu personaje:',
  MAIN_CHARACTER_CREATION: 'se ha creado tu personaje {{characterName}}',
  MAIN_CHARACTER_WELCOME_BACK:
    '🎮 Bienvenido de nuevo, {{characterName}}! Tu aventura continúa...',

  /* SCENE > TOWN > INN */
  TOWN_INN_RESTED:
    'Haz dormido bien y te encuentras [c:cyan]recuperado de energía[/]',

  /* SCENE > COMBAT */
  FOREST_ENTERING_GOBLINGS: 'Llegaste al Bosque de Goblins.',
  FOREST_ENTERING_GOLEM: 'Llegaste al Bosque de Gólems.',
  FOREST_ENTERING_DRAGON: 'Llegaste al Bosque de Dragones.',
};
