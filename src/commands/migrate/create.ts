import { Args, Command, Flags } from '@oclif/core';
import { createMigration } from '../../core/migrate';

export default class MigrateCreate extends Command {
	static description = 'Say hello world';

	static examples = ['<example>'];

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
		createMigration(args.name, flags);
	}
}
