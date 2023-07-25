import MigrateUp from './up';

jest.mock('fs/promises');

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
  });
  it('should execute', async () => {
    await MigrateUp.run([]);
    expect(stdout).toEqual([]);
  });
});
