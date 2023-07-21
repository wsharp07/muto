import { databaseFactory } from '../database/database';
import { type IDatabaseAdapter, DB_TYPE } from '../interface';

export const runMigration = async (): Promise<void> => {
  const db: IDatabaseAdapter = databaseFactory(
    DB_TYPE.POSTGRES,
    'postgres://postgres:postgres@localhost:5432/test-db',
  );
  await db.createMigrationTable();
  const latestMigration = await db.getLatestMigration();
  db.dispose();
  console.log(latestMigration);
};
