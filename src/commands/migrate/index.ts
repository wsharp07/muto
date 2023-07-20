import { Args, Command, Flags } from '@oclif/core';

export default class Migrate extends Command {
	static description = 'Commands to work with migrations';

	static examples = ['$ muto migrate -c name'];

	static flags = {
		from: Flags.string({
			char: 'c',
			description: 'Create a new migration',
			required: true,
		}),
	};

	static args = {
		person: Args.string({
			description: 'Name of the migration',
			required: true,
		}),
	};

	async run(): Promise<void> {
		const { args, flags } = await this.parse(Migrate);

		this.log(
			`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`,
		);
	}
}
