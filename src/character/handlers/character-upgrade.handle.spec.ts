import { getCharacterFixture } from '@game/common/fixtures/character.fixture';

import { CharacterUpgradeHandler } from './character-upgrade.handler';

describe('CharacterUpgradeHandler - Roles (Max Level)', () => {
  it('should update stats for a Tank character', () => {
    const character = getCharacterFixture({ vit: 155 });

    new CharacterUpgradeHandler().handle(character);

    expect(character.maxHp).toBe(825);
    expect(character.maxMp).toBe(35);
    expect(character.eva).toBe(2.5);
    expect(character.ctr).toBe(2.5);
    expect(character.dmg).toBe(23);
  });

  it('should update stats for a Support character', () => {
    const character = getCharacterFixture({ int: 155 });

    new CharacterUpgradeHandler().handle(character);

    expect(character.maxHp).toBe(75);
    expect(character.maxMp).toBe(485);
    expect(character.eva).toBe(2.5);
    expect(character.ctr).toBe(2.5);
    expect(character.dmg).toBe(23);
  });

  it('should update stats for an Agile character', () => {
    const character = getCharacterFixture({ dex: 155 });

    new CharacterUpgradeHandler().handle(character);

    expect(character.maxHp).toBe(75);
    expect(character.maxMp).toBe(35);
    expect(character.eva).toBe(77.5);
    expect(character.ctr).toBe(2.5);
    expect(character.dmg).toBe(23);
  });

  it('should update stats for a Crit-focused character', () => {
    const character = getCharacterFixture({ luk: 155 });

    new CharacterUpgradeHandler().handle(character);

    expect(character.maxHp).toBe(75);
    expect(character.maxMp).toBe(35);
    expect(character.eva).toBe(2.5);
    expect(character.ctr).toBe(77.5);
    expect(character.dmg).toBe(23);
  });

  it('should update stats for a Balanced Fighter', () => {
    const character = getCharacterFixture({
      str: 30,
      vit: 30,
      int: 30,
      dex: 30,
      luk: 30,
    });

    new CharacterUpgradeHandler().handle(character);

    expect(character.maxHp).toBe(200);
    expect(character.maxMp).toBe(110);
    expect(character.eva).toBe(15);
    expect(character.ctr).toBe(15);
    expect(character.dmg).toBe(35);
  });
});
