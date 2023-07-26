import MigrateUp from './up';

jest.mock('fs/promises');

jest.mock('mysql2/promise');

describe.only('migrate:up', () => {
  let stdout: string[];

  beforeEach(() => {
    stdout = [];
    jest.spyOn(process.stdout, 'write').mockImplementation((value) => {
      if (typeof value === 'string') {
        stdout.push(value);
      } else {
        stdout.push(value.toString());
      }

      return true;
    });

    process.env.MUTO_DB_CONNECTION_STRING =
      'mysql://test:test@localhost:3306/db';
  });
  it('should execute', async () => {
    await MigrateUp.run([]);
    expect(stdout).toEqual([]);
  });
});
