import { DB_TYPE, IDatabaseAdapter } from '../interface';
import { MySqlDatabaseAdapter } from './mysql';
import { PostgresDatabaseAdapter } from './postgres';

export const DatabaseFactory = (
  dbType: DB_TYPE,
  connectionString: string
): IDatabaseAdapter => {
  switch (dbType) {
    case DB_TYPE.POSTGRES:
      return new PostgresDatabaseAdapter(connectionString);
    case DB_TYPE.MYSQL:
      return new MySqlDatabaseAdapter(connectionString);
    default:
      throw new Error(`Unsupported database type: ${dbType}`);
  }
};
