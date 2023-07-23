import { IMigration, IMigrationConfig } from '@core/interface';
import { readFile, readdir } from 'fs/promises';

export const loadMigration = async (
  directory: string,
  name: string
): Promise<IMigration> => {
  const up = await readFile(`${directory}/${name}/up.sql`, {
    encoding: 'utf8',
    flag: 'r',
  });

  const down = await readFile(`${directory}/${name}/up.sql`, {
    encoding: 'utf8',
    flag: 'r',
  });

  return {
    name,
    upSql: up,
    downSql: down,
  };
};

export const loadMigrations = async (config: IMigrationConfig) => {
  const migrations = await readdir(config.migrationDir);
  return migrations.sort();
};

export const diffMigrations = async (
  allMigrations: string[],
  latestMigration: string
) => {
  if (!latestMigration) {
    return allMigrations;
  }
  const latestMigrationIndex = allMigrations.indexOf(latestMigration);
  return allMigrations.slice(latestMigrationIndex + 1);
};
