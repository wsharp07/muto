import * as fs from 'node:fs';
import { DB_TYPE, type IDatabaseAdapter } from './interface';
import { databaseFactory } from './database/database';

const DEFAULT_MIGRATION_DIR = 'migrations';

const createDirectory = (directory: string): void => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
};

const createBaseDirectory = (): void => {
  createDirectory(DEFAULT_MIGRATION_DIR);
};

const createFile = (directory: string, name: string, content: string): void => {
  fs.writeFileSync(`${directory}/${name}`, content);
};

const createMigration = (
  name: string,
  options: { before: boolean; after: boolean }
): void => {
  createBaseDirectory();
  const directory = `${DEFAULT_MIGRATION_DIR}/${Date.now()}-${name}`;
  createDirectory(directory);
  createFile(directory, 'up.sql', '## Write your up migration here\n');
  createFile(directory, 'down.sql', '## Write your down migration here\n');

  if (options.before) {
    createFile(
      directory,
      'before.sql',
      '## Write your before migration here\n'
    );
  }

  if (options.after) {
    createFile(directory, 'after.sql', '## Write your after migration here\n');
  }
};

const runMigration = async (): Promise<void> => {
  const database: IDatabaseAdapter = databaseFactory(
    DB_TYPE.POSTGRES,
    'postgres://postgres:postgres@localhost:5432/test-db'
  );
  await database.createMigrationTable();
  const latestMigration = await database.getLatestMigration();
  database.dispose();
  console.log(latestMigration);
};

export { createMigration, runMigration };
