import * as fs from 'node:fs';
import { DB_TYPE, type IDatabaseAdapter } from './interface';
import { databaseFactory } from './database/database';

const DEFAULT_MIGRATION_DIR = 'migrations';

const createBaseDirectory = (): void => {
	createDirectory(DEFAULT_MIGRATION_DIR);
};

const createDirectory = (dir: string): void => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
};

const createFile = (dir: string, name: string, content: string): void => {
	fs.writeFileSync(`${dir}/${name}`, content);
};

const createMigration = (name: string): void => {
	createBaseDirectory();
	const dir = `${DEFAULT_MIGRATION_DIR}/${Date.now()}-${name}`;
	createDirectory(dir);
	createFile(dir, 'up.sql', '## Write your up migration here\n');
	createFile(dir, 'down.sql', '## Write your down migration here\n');
	createFile(dir, 'before.sql', '## Write your before migration here\n');
	createFile(dir, 'after.sql', '## Write your after migration here\n');
};

const runMigration = async (): Promise<void> => {
	const db: IDatabaseAdapter = databaseFactory(
		DB_TYPE.POSTGRES,
		'postgres://postgres:postgres@localhost:5432/test-db',
	);
	await db.createMigrationTable();
	const latestMigration = await db.getLatestMigration();
	db.dispose();
	console.log(latestMigration);
};

export { createMigration, runMigration };
