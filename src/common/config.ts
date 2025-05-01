function parseEnvValue<T>(value: string, type: string): T {
  switch (type) {
    case 'string':
      return value as unknown as T;
    case 'number': {
      const num = Number(value);
      if (isNaN(num)) throw new Error(`Expected number but got "${value}"`);
      return num as unknown as T;
    }
    case 'boolean':
      return (value === 'true') as unknown as T;
    default:
      throw new Error(`Unsupported type "${type}"`);
  }
}

export function requiredEnv<T>(key: string, defaultValue?: T): T {
  const raw = process.env[key];

  if (raw == null) {
    if (defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return defaultValue;
  }

  const type = defaultValue !== undefined ? typeof defaultValue : 'string';
  return parseEnvValue<T>(raw, type);
}

// DATABASE CONFIGURATION
export const MONGO_URI_CONST = requiredEnv<string>('MONGO_URI');
export const MONGO_DB_NAME_CONST = requiredEnv<string>('MONGO_DB_NAME');

// CHARACTER
export const DEFAULT_CHARACTER_NAME = requiredEnv<string>(
  'DEFAULT_CHARACTER_NAME',
);

// GAME
export const REAL_DAY_PER_GAME_HOURS = requiredEnv<number>(
  'REAL_DAY_PER_GAME_HOURS',
  2,
);
