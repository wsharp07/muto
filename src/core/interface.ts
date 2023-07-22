export type IDatabaseAdapter = {
  query(query: string): Promise<void>;
  createMigrationTable(): Promise<void>;
  getLatestMigration(): Promise<void>;
  dispose(): void;
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
  shouldCreateBeforeScript: true,
  shouldCreateAfterScript: true,
};
