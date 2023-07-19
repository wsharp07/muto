export interface IDatabaseAdapter {
  query(query: string): Promise<void>;
  createMigrationTable(): Promise<void>;
  getLatestMigration(): Promise<void>;
  dispose(): void;
}

export const DB_TYPE = {
  POSTGRES: 'POSTGRES',
  MYSQL: 'MYSQL',
} as const;
export type DB_TYPE = (typeof DB_TYPE)[keyof typeof DB_TYPE];
