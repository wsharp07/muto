import MigrateCreate from './create';

jest.mock('node:fs/promises');

describe('migrate:create', () => {
  let stdout: string[];

  beforeEach(() => {
    stdout = [];
    jest.spyOn(process.stdout, 'write').mockImplementation(value => {
      if (typeof value === 'string') {
        stdout.push(value);
      } else {
        stdout.push(value.toString());
      }

      return true;
    });
  });
  it('should execute', async () => {
    await MigrateCreate.run(['help']);
    expect(stdout).toEqual([]);
  });
});
