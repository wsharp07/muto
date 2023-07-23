export type IDatabaseAdapter = {
  query(query: string): Promise<void>;
  createMigrationTable(): Promise<void>;
  getLatestMigration(): Promise<string>;
  executeMigrationUp(migration: IMigration): Promise<void>;
  executeMigrationDown(migration: IMigration): Promise<void>;
  dispose(): void;
};

export type IMigration = {
  name: string;
  up: string;
  down: string;
  before?: string;
  after?: string;
};

export const DATABASE_TYPE = {
  POSTGRES: 'POSTGRES',
  MYSQL: 'MYSQL',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/naming-convention
export type DATABASE_TYPE = (typeof DATABASE_TYPE)[keyof typeof DATABASE_TYPE];

export type IMigrationConfig = {
  migrationDir: string;
  shouldCreateBeforeScript: boolean;
  shouldCreateAfterScript: boolean;
};

export const DEFAULT_CONFIG: IMigrationConfig = {
  migrationDir: 'migrations',
  shouldCreateBeforeScript: false,
  shouldCreateAfterScript: false,
};
