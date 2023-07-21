export type IDatabaseAdapter = {
  query(query: string): Promise<void>;
  createMigrationTable(): Promise<void>;
  getLatestMigration(): Promise<void>;
  dispose(): void;
};

export const DB_TYPE = {
  POSTGRES: 'POSTGRES',
  MYSQL: 'MYSQL',
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DB_TYPE = (typeof DB_TYPE)[keyof typeof DB_TYPE];

export type IMigrationConfig = {
  migrationDir: string;
  shouldCreateBeforeScript: boolean;
  shouldCreateAfterScript: boolean;
};

export const DEFAULT_CONFIG: IMigrationConfig = {
  migrationDir: 'migrations',
  shouldCreateBeforeScript: true,
  shouldCreateAfterScript: true,
};
