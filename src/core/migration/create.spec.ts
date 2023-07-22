import { readdir } from 'fs/promises';
import { vol } from 'memfs';
import { createMigration } from './create';

jest.mock('fs/promises');

describe('migrate', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should create a migration', async () => {
    await createMigration('test');
    const migrationDirectory = await readdir('migrations');
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(`migrations/${migrationDirectory[0]}`);
    expect(migrationFiles.length).toBe(4);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(true);
    expect(migrationFiles.includes('after.sql')).toBe(true);
  });
});
