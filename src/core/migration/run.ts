import {
  type IDatabaseAdapter,
  DEFAULT_CONFIG,
  IMigrationConfig,
} from '../interface';
import { loadMigrations, diffMigrations, loadMigration } from './util';

export const runMigrations = async (
  database: IDatabaseAdapter,
  config: IMigrationConfig = DEFAULT_CONFIG
): Promise<void> => {
  // const database: IDatabaseAdapter = databaseFactory(
  //   DATABASE_TYPE.POSTGRES,
  //   'postgres://postgres:postgres@localhost:5432/test-db'
  // );
  try {
    await database.createMigrationTable();
    const latestMigration = await database.getLatestMigration();
    const migrationsOnDisk = await loadMigrations(config);
    const migrationsToRun = await diffMigrations(
      migrationsOnDisk,
      latestMigration
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const migration of migrationsToRun) {
      // eslint-disable-next-line no-await-in-loop
      const migrationToRun = await loadMigration(
        config.migrationDir,
        migration
      );
      // eslint-disable-next-line no-await-in-loop
      await database.executeMigrationUp(migrationToRun);
    }
  } finally {
    database.dispose();
  }
};
