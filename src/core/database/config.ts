import {
  DATABASE_TYPE,
  IDatabaseConfig,
  isSupportedDatabaseType,
} from '../interface';
import 'dotenv/config';

export const databaseConfigFromEnvironment = (): IDatabaseConfig => {
  const connectionString = process.env.MUTO_DB_CONNECTION_STRING || '';

  if (!connectionString) {
    throw new Error('ENV VAR MUTO_DB_CONNECTION_STRING Missing');
  }

  const databaseType =
    connectionString.split('://')[0].toUpperCase() || undefined;

  if (!databaseType) {
    throw new Error(
      'ENV VAR MUTO_DB_CONNECTION_STRING Invalid. Missing database type'
    );
  }

  if (!isSupportedDatabaseType(databaseType)) {
    throw new TypeError(
      `ENV VAR MUTO_DB_CONNECTION_STRING Invalid. Unsupported database type ${databaseType}`
    );
  }

  return { databaseType: databaseType as DATABASE_TYPE, connectionString };
};
