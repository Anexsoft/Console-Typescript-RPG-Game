import {
  bold,
  yellow,
  red,
  white,
  cyanBright,
  redBright,
  magentaBright,
} from 'chalk';
import inquirer from 'inquirer';

import { GameState } from '@game/engine/game.state';

export enum DialoguerType {
  GAME = 'GAME',
  PLAYER = 'PLAYER',
  ENEMY = 'ENEMY',
}

export enum DialoguerLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type DialoguerInput = {
  who: DialoguerType;
  message: string;
  level?: DialoguerLevel;
  options?: DialoguerPromtOpts;
};

type DialoguerPromptType = 'input' | 'list' | 'checkbox' | 'select';

type DialoguerPromtOpts = {
  nameOverride?: string;
  type?: DialoguerPromptType;
  choices?: { name: string; value: string | number }[];
  validate?: (value: string | number) => boolean | string;
};

type DialoguerPromtTypeInput = {
  type: 'input';
  name: 'action';
  message: string;
  validate?: (value: string | number) => boolean | string;
};

type DialoguerPromtTypeList = {
  type: 'list';
  name: 'action';
  message: string;
  validate?: (value: string | number) => boolean | string;
};

export class Dialoguer {
  static async send<R = void>({
    who,
    message,
    level,
    options,
  }: DialoguerInput): Promise<R> {
    const promptParams = this.buildPromptOptions(
      this.compose(who, message, level, options?.nameOverride),
      options,
    );

    const { action } = await inquirer.prompt([promptParams]);

    return action as R;
  }

  private static compose(
    who: DialoguerType,
    message: string,
    level: DialoguerLevel = DialoguerLevel.INFO,
    nameOverride?: string,
  ): string {
    const tag = Dialoguer.formatTag(who, nameOverride);
    const coloredMessage = Dialoguer.colorize(message, level);

    return `${tag}: ${coloredMessage}`;
  }

  private static colorize(message: string, level: DialoguerLevel): string {
    switch (level) {
      case DialoguerLevel.WARNING:
        return yellow(message);
      case DialoguerLevel.ERROR:
        return red(message);
      case DialoguerLevel.INFO:
      default:
        return white(message);
    }
  }

  private static formatTag(who: DialoguerType, nameOverride?: string): string {
    const label = `[${who}]`;

    switch (who) {
      case DialoguerType.GAME:
        return bold(magentaBright(label));
      case DialoguerType.PLAYER:
        return bold(
          cyanBright(nameOverride ?? GameState.character.name ?? label),
        );
      case DialoguerType.ENEMY:
        return bold(redBright(nameOverride ?? label));
      default:
        return bold(white(label));
    }
  }

  private static buildPromptOptions(
    message: string,
    options?: DialoguerPromtOpts,
  ): DialoguerPromtTypeInput | DialoguerPromtTypeList {
    const name = 'action';
    const type = options?.type ?? 'input';

    if (type === 'input') {
      return {
        name,
        type,
        message,
        validate: options?.validate,
      } as DialoguerPromtTypeInput;
    } else {
      return {
        name,
        type,
        message,
        choices: options?.choices,
      } as DialoguerPromtTypeList;
    }
  }
}
