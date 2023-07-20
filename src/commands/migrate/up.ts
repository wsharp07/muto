import { runMigration } from '../../core/migrate';
import { Args, Command } from '@oclif/core';

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
