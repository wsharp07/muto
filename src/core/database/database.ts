import { DATABASE_TYPE, type IDatabaseAdapter } from '../interface';
import { MySqlDatabaseAdapter } from './mysql';
import { PostgresDatabaseAdapter } from './postgres';

export const databaseFactory = (
  databaseType: DATABASE_TYPE,
  connectionString: string
): IDatabaseAdapter => {
  switch (databaseType) {
    case DATABASE_TYPE.POSTGRES: {
      return new PostgresDatabaseAdapter(connectionString);
    }

    case DATABASE_TYPE.MYSQL: {
      return new MySqlDatabaseAdapter(connectionString);
    }

    default: {
      throw new Error('Unsupported database type');
    }
  }
};
