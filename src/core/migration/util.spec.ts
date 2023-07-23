import { vol } from 'memfs';
import { createMigration } from './create';
import { diffMigrations, loadMigrations } from './util';

jest.mock('fs/promises');

describe('migrate', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should load migrations from disk', async () => {
    // Arrange
    await createMigration('test1');
    await createMigration('test2');
    await createMigration('test3');

    // Act
    const sut = await loadMigrations({
      migrationDir: 'migrations',
    });

    // Assert
    expect(sut.length).toBe(3);
    expect(sut[0]).toContain('test1');
  });

  it('should only return the necessary migrations if migrations already exist in the database', async () => {
    // Arrange
    await createMigration('test1');
    await createMigration('test2');
    await createMigration('test3');

    const migrations = await loadMigrations({
      migrationDir: 'migrations',
    });

    // Act
    const sut = await diffMigrations(migrations, migrations[1]);

    // Assert
    expect(sut.length).toBe(1);
    expect(sut[0]).toContain('test3');
  });

  it('should return all migrations if none exist in the database', async () => {
    // Arrange
    await createMigration('test1');
    await createMigration('test2');
    await createMigration('test3');

    const migrations = await loadMigrations({
      migrationDir: 'migrations',
    });

    // Act
    const sut = await diffMigrations(migrations, '');

    // Assert
    expect(sut.length).toBe(3);
  });
});
