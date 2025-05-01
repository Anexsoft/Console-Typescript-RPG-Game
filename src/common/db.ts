import { MongoClient, Db } from 'mongodb';

import { MONGO_URI_CONST, MONGO_DB_NAME_CONST } from './config';

const client = new MongoClient(MONGO_URI_CONST);
let dbInstance: Db | null = null;

/**
 * Returns a singleton MongoDB database instance.
 */
export async function getDbInstance(): Promise<Db> {
  if (!dbInstance) {
    try {
      await client.connect();
      dbInstance = client.db(MONGO_DB_NAME_CONST);
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  return dbInstance;
}
