import { databaseConfigFromEnvironment } from '@core/database/config';
import { databaseFactory } from '@core/database/database';
import { runMigrations } from '@core/migration';
import { Command } from '@oclif/core';

export default class MigrateUp extends Command {
  static description = 'Runs all pending migrations';

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {};

  static args = {};

  public async run(): Promise<void> {
    await this.parse(MigrateUp);

    const database = databaseFactory(databaseConfigFromEnvironment());

    await runMigrations(database);
  }
}