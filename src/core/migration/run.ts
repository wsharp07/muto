import { databaseFactory } from '../database/database';
import { type IDatabaseAdapter, DATABASE_TYPE } from '../interface';

export const runMigration = async (): Promise<void> => {
  const database: IDatabaseAdapter = databaseFactory(
    DATABASE_TYPE.POSTGRES,
    'postgres://postgres:postgres@localhost:5432/test-db'
  );
  await database.createMigrationTable();
  await database.getLatestMigration();
  database.dispose();
};
