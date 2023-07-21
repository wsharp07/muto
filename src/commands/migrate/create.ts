import { Args, Command, Flags } from '@oclif/core';
import { createMigration } from '../../core/migrate';
import { DEFAULT_CONFIG } from '@core/interface';

export default class MigrateCreate extends Command {
  static description = 'Creates a new migration';

  static examples = ['<%= config.bin %> <%= command.id %> add-user-table'];

  static flags = {
    before: Flags.boolean({
      char: 'b',
      description: 'Create a Before script',
      required: false,
    }),
    after: Flags.boolean({
      char: 'a',
      description: 'Create a After script',
      required: false,
    }),
  };

  static args = {
    name: Args.string({ description: 'Name of the migration', required: true }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(MigrateCreate);
    const config = {
      ...DEFAULT_CONFIG,
      shouldCreateBeforeScript: flags.before,
      shouldCreateAfterScript: flags.after,
    };
    await createMigration(args.name, config);
  }
}
