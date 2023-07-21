import { createMigration } from '@core/migration';
import { Args, Command } from '@oclif/core';

export default class MigrateCreate extends Command {
  static description = 'Creates a new migration';

  static examples = ['<%= config.bin %> <%= command.id %> add-user-table'];

  static flags = {};

  static args = {
    name: Args.string({ description: 'Name of the migration', required: true }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(MigrateCreate);
    await createMigration(args.name);
  }
}
