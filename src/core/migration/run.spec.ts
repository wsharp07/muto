import { vol } from 'memfs';
import { PostgresDatabaseAdapter } from '@core/database/postgres';
import { createMigration } from './create';
import { runMigrations } from './run';

jest.mock('fs/promises');

describe('migrate', () => {
  beforeEach(() => {
    vol.reset();
  });

  it('should run migrations', async () => {
    const databaseStub = new PostgresDatabaseAdapter(
      'postgres://postgres:postgres@localhost:5432/test'
    );
    const createMigrationTableSpy = jest
      .spyOn(databaseStub, 'createMigrationTable')
      .mockResolvedValueOnce();
    const getLatestMigrationSpy = jest
      .spyOn(databaseStub, 'getLatestMigration')
      .mockResolvedValueOnce('');
    const executeMigrationUpSpy = jest
      .spyOn(databaseStub, 'executeMigrationUp')
      .mockResolvedValue();
    const disposeSpy = jest.spyOn(databaseStub, 'dispose');

    // Arrange
    await createMigration('test1');
    await createMigration('test2');
    await createMigration('test3');

    // Act
    await runMigrations(databaseStub, {
      migrationDir: 'migrations',
    });

    // Assert
    expect(createMigrationTableSpy).toBeCalledTimes(1);
    expect(getLatestMigrationSpy).toHaveBeenCalledTimes(1);
    expect(executeMigrationUpSpy).toHaveBeenCalledTimes(3);
    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });
});
