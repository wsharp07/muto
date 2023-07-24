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
  try {
    await database.createMigrationTable();
    const latestMigration = await database.getLatestMigration();
    const migrationsOnDisk = await loadMigrations(config);
    const migrationsToRun = await diffMigrations(
      migrationsOnDisk,
      latestMigration
    );

    for (const migration of migrationsToRun) {
      const migrationToRun = await loadMigration(
        config.migrationDir,
        migration
      );
      await database.executeMigrationUp(migrationToRun);
    }
  } finally {
    await database.dispose();
  }
};
