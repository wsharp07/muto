import { writeFile, mkdir } from 'fs/promises';
import { DEFAULT_CONFIG } from '@core/interface';

const createDirectory = async (dir: string): Promise<void> => {
  await mkdir(dir, { recursive: true });
};

const createFile = async (
  dir: string,
  name: string,
  content: string,
): Promise<void> => {
  await writeFile(`${dir}/${name}`, content);
};

export const createMigration = async (
  name: string,
  config = DEFAULT_CONFIG,
): Promise<void> => {
  const dir = `${config.migrationDir}/${Date.now()}-${name}`;
  await createDirectory(dir);
  await createFile(dir, 'up.sql', '## Write your up migration here\n');
  await createFile(dir, 'down.sql', '## Write your down migration here\n');
  await createFile(dir, 'before.sql', '## Write your before migration here\n');
  await createFile(dir, 'after.sql', '## Write your after migration here\n');
};
