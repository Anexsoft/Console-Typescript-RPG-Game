import { Character } from '@game/character';
import { ObjectId } from 'mongodb';

import { getDbInstance } from '@game/common/db';

export class CharacterRepository {
  private readonly COLLECTION_NAME = 'characters';

  async create(character: Character): Promise<void> {
    const db = await getDbInstance();
    await db.collection<Character>(this.COLLECTION_NAME).insertOne(character);
  }

  async update(id: ObjectId, character: Character): Promise<void> {
    const db = await getDbInstance();
    await db
      .collection<Character>(this.COLLECTION_NAME)
      .updateOne({ _id: id }, { $set: character });
  }

  async findByName(name: string): Promise<Character | null> {
    const db = await getDbInstance();
    return db.collection<Character>(this.COLLECTION_NAME).findOne({ name });
  }
}
