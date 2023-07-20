import { Args, Command } from '@oclif/core';
import { createMigration } from '../../core/migrate';

export default class MigrateCreate extends Command {
	static description = 'Say hello world';

	static examples = ['<example>'];

	static flags = {};

	static args = {
		name: Args.string({ description: 'Name of the migration', required: true }),
	};

	async run(): Promise<void> {
		const { args } = await this.parse(MigrateCreate);
		createMigration(args.name);
	}
}
