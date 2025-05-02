import { Character } from '@game/character';

import { DEFAULT_CHARACTER_NAME } from '@game/common/config';
import { Dialoguer, DialoguerType } from '@game/common/dialoguer';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';
import {
  MainCharacterCreationMessageText,
  MainCharacterWelcomeBackMessageText,
} from '@game/engine/types/texts.types';

import { SceneHandler } from '@game/scenes/scene.interface';

import { CharacterCreateHandler } from '@game/character/handlers/character-create.handler';
import { CharacterGetHandler } from '@game/character/handlers/character-get.handler';
import { CharacterUpgradeHandler } from '@game/character/handlers/character-upgrade.handler';

export class MainScene implements SceneHandler {
  private readonly characterCreateHandler = new CharacterCreateHandler();
  private readonly characterUpgradeHandler = new CharacterUpgradeHandler();
  private readonly characterGetHandler = new CharacterGetHandler();

  async handle(): Promise<void> {
    const defaultName = DEFAULT_CHARACTER_NAME;

    if (defaultName) {
      const character = await this.findCharacter(defaultName);
      if (character) {
        GameState.setCharacter(character);

        await Dialoguer.send({
          who: DialoguerType.GAME,
          message: GameManager.getMessage<MainCharacterWelcomeBackMessageText>(
            'MAIN_CHARACTER_WELCOME_BACK',
            { characterName: character.name },
          ),
        });

        GameManager.changeScene(GameManagerSceneName.TownScene);
        return;
      }
    }

    await this.welcomeMessageDialog();

    const characterName = await this.enterCharacterUsername();
    const character = await this.findCharacter(characterName);

    if (!character) {
      await this.createNewCharacter(characterName);
    } else {
      GameState.setCharacter(character);
    }

    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  async welcomeMessageDialog(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('MAIN_WELCOME'),
    });

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('MAIN_WELCOME_INTRO'),
    });
  }

  async enterCharacterUsername(): Promise<string> {
    const characterName = await Dialoguer.send<string>({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('MAIN_CHARACTER_NAME'),
      options: {
        validate: (input: string): boolean | string => {
          return input.trim() !== '' || 'El nombre no puede estar vacío.';
        },
      },
    });

    return characterName.toLowerCase();
  }

  async findCharacter(name: string): Promise<Character> {
    return this.characterGetHandler.handle(name);
  }

  async createNewCharacter(name: string): Promise<void> {
    const character = new Character(name);

    this.characterUpgradeHandler.handle(character);
    await this.characterCreateHandler.handle(character);

    GameState.setCharacter(character);

    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage<MainCharacterCreationMessageText>(
        'MAIN_CHARACTER_CREATION',
        { characterName: character.name },
      ),
    });
  }
}
