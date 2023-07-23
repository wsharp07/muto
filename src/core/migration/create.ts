import { writeFile, mkdir } from 'fs/promises';
import { DEFAULT_CONFIG } from '@core/interface';
import { AFTER_FILE, BEFORE_FILE, DOWN_FILE, UP_FILE } from '@core/constants';

const createDirectory = async (directory: string): Promise<void> => {
  await mkdir(directory, { recursive: true });
};

const createFile = async (
  directory: string,
  name: string,
  content: string
): Promise<void> => {
  await writeFile(`${directory}/${name}`, content);
};

export const createMigration = async (
  name: string,
  config = DEFAULT_CONFIG
): Promise<void> => {
  const directory = `${config.migrationDir}/${Date.now()}-${name}`;
  await createDirectory(directory);
  await createFile(directory, UP_FILE, '## Write your up migration here\n');
  await createFile(directory, DOWN_FILE, '## Write your down migration here\n');
  if (config.shouldCreateBeforeScript) {
    await createFile(
      directory,
      BEFORE_FILE,
      '## Write your before migration here\n'
    );
  }

  if (config.shouldCreateAfterScript) {
    await createFile(
      directory,
      AFTER_FILE,
      '## Write your after migration here\n'
    );
  }
};
