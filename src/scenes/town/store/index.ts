import { Character } from '@game/character';

import { Dialoguer, DialoguerType } from '@game/common/dialoguer';
import { SceneHandler } from '@game/common/interfaces/scene.interface';

import { GameManager, GameManagerSceneName } from '@game/engine/game.manager';
import { GameState } from '@game/engine/game.state';

import { CharacterGoldHandler } from '@game/character/handlers/character-gold.handle';
import { CharacterUpdateHandler } from '@game/character/handlers/character-update.handler';
import { CharacterPushSpecialPowerHandler } from '@game/character/handlers/features/character-push-special-power.handler';
import { CharacterUpdateSpecialPowerHandler } from '@game/character/handlers/features/character-update-special-power.handler';
import { CHARACTER_SPECIAL_POWER_COSTS } from '@game/character/types/special-power-costs.types';
import { CharacterSpecialPower } from '@game/character/types/special-power.types';

export class StoreScene implements SceneHandler {
  private readonly pushPowerHandler = new CharacterPushSpecialPowerHandler();
  private readonly updatePowerHandler =
    new CharacterUpdateSpecialPowerHandler();
  private readonly updateCharacterHandler = new CharacterUpdateHandler();
  private readonly goldHandler = new CharacterGoldHandler();

  async handle(): Promise<void> {
    await this.processStoreInteraction();
    GameManager.changeScene(GameManagerSceneName.TownScene);
  }

  private async processStoreInteraction(): Promise<void> {
    const character = GameState.character;

    const unownedPowers = this.getUnownedPowers(character);
    if (unownedPowers.length === 0) {
      await this.showStoreClosedMessage();
      return;
    }

    const selectedPower = await this.promptPowerSelection(unownedPowers);
    if (selectedPower === 'cancel') return;

    const success = this.handlePurchaseAttempt(character, selectedPower);
    if (!success) {
      await this.showNotEnoughGoldMessage();
      await this.processStoreInteraction(); // retry
      return;
    }

    this.grantPowerToCharacter(character, selectedPower);
    await this.updateCharacterHandler.handle(character);
    await this.showPurchaseSuccessMessage();

    await this.processStoreInteraction(); // loop again
  }

  private getUnownedPowers(character: Character): CharacterSpecialPower[] {
    return Object.values(CharacterSpecialPower).filter(
      (power) => !character.specialPowers.includes(power),
    );
  }

  private async showStoreClosedMessage(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_STORE_CLOSE'),
    });
  }

  private async promptPowerSelection(
    powers: CharacterSpecialPower[],
  ): Promise<CharacterSpecialPower | 'cancel'> {
    return await Dialoguer.send<CharacterSpecialPower | 'cancel'>({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_STORE_PURCHASE'),
      options: {
        type: 'list',
        choices: [
          ...powers.map((power) => {
            const { price } = CHARACTER_SPECIAL_POWER_COSTS[power];
            return {
              name: `[${price} coins] ${power}`,
              value: power,
            };
          }),
          { name: 'Cancel and return to town', value: 'cancel' },
        ],
      },
    });
  }

  private handlePurchaseAttempt(
    character: Character,
    power: CharacterSpecialPower,
  ): boolean {
    const { price } = CHARACTER_SPECIAL_POWER_COSTS[power];
    if (character.gold < price) return false;

    this.goldHandler.handle({
      character,
      gold: price,
      action: 'decrease',
    });

    return true;
  }

  private grantPowerToCharacter(
    character: Character,
    power: CharacterSpecialPower,
  ): void {
    this.pushPowerHandler.handle({ character, specialPower: power });

    if (character.specialPower === null) {
      this.updatePowerHandler.handle({ character, specialPower: power });
    }
  }

  private async showNotEnoughGoldMessage(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_STORE_PURCHASE_ENOUGH_MONEY'),
    });
  }

  private async showPurchaseSuccessMessage(): Promise<void> {
    await Dialoguer.send({
      who: DialoguerType.GAME,
      message: GameManager.getMessage('TOWN_STORE_PURCHASE_SUCCESFUL'),
    });
  }
}
