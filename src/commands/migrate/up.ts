import { Args, Command } from '@oclif/core';
import { runMigration } from '../../core/migrate';

export default class MigrateUp extends Command {
	static description = 'Say hello world';

	static examples = ['<example>'];

	static flags = {};

	static args = {};

	async run(): Promise<void> {
		const { args } = await this.parse(MigrateUp);
		await runMigration();
	}
}
