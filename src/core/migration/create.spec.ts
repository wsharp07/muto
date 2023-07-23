import { readdir } from 'fs/promises';
import { vol } from 'memfs';
import { DEFAULT_CONFIG } from '@core/interface';
import { createMigration } from './create';

jest.mock('fs/promises');

describe('migrate', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should create a migration without before and after files when run with default config', async () => {
    await createMigration('test');
    const migrationDirectory = await readdir(DEFAULT_CONFIG.migrationDir);
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(
      `${DEFAULT_CONFIG.migrationDir}/${migrationDirectory[0]}`
    );
    expect(migrationFiles.length).toBe(2);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(false);
    expect(migrationFiles.includes('after.sql')).toBe(false);
  });

  it('should create a migration with a before file when the before config flag is set', async () => {
    await createMigration('test', {
      ...DEFAULT_CONFIG,
      shouldCreateBeforeScript: true,
    });
    const migrationDirectory = await readdir(DEFAULT_CONFIG.migrationDir);
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(
      `${DEFAULT_CONFIG.migrationDir}/${migrationDirectory[0]}`
    );
    expect(migrationFiles.length).toBe(3);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(true);
    expect(migrationFiles.includes('after.sql')).toBe(false);
  });

  it('should create a migration with an after file when the after config flag is set', async () => {
    await createMigration('test', {
      ...DEFAULT_CONFIG,
      shouldCreateAfterScript: true,
    });
    const migrationDirectory = await readdir(DEFAULT_CONFIG.migrationDir);
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(
      `${DEFAULT_CONFIG.migrationDir}/${migrationDirectory[0]}`
    );
    expect(migrationFiles.length).toBe(3);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(false);
    expect(migrationFiles.includes('after.sql')).toBe(true);
  });

  it('should create a migration with before and after files when both config values are set', async () => {
    await createMigration('test', {
      ...DEFAULT_CONFIG,
      shouldCreateAfterScript: true,
      shouldCreateBeforeScript: true,
    });
    const migrationDirectory = await readdir(DEFAULT_CONFIG.migrationDir);
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(
      `${DEFAULT_CONFIG.migrationDir}/${migrationDirectory[0]}`
    );
    expect(migrationFiles.length).toBe(4);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(true);
    expect(migrationFiles.includes('after.sql')).toBe(true);
  });

  it('should allow the output migration directory to be overridden via the config', async () => {
    const alternateDirectory = 'alternate-migration-directory';
    await createMigration('test', {
      ...DEFAULT_CONFIG,
      migrationDir: alternateDirectory,
    });
    const migrationDirectory = await readdir(alternateDirectory);
    console.log(migrationDirectory);
    expect(migrationDirectory.length).toBe(1);

    const migrationFiles = await readdir(
      `${alternateDirectory}/${migrationDirectory[0]}`
    );
    expect(migrationFiles.length).toBe(2);
    expect(migrationFiles.includes('up.sql')).toBe(true);
    expect(migrationFiles.includes('down.sql')).toBe(true);
    expect(migrationFiles.includes('before.sql')).toBe(false);
    expect(migrationFiles.includes('after.sql')).toBe(false);
  });
});
