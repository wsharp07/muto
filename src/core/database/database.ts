import {
  DATABASE_TYPE,
  IDatabaseConfig,
  type IDatabaseAdapter,
} from '../interface';
import { MySqlDatabaseAdapter } from './mysql';
import { PostgresDatabaseAdapter } from './postgres';

export const databaseFactory = ({
  databaseType,
  connectionString,
}: IDatabaseConfig): IDatabaseAdapter => {
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
