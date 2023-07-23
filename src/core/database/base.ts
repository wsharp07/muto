import { IDatabaseAdapter, IMigration } from '@core/interface';

export abstract class BaseDatabaseAdapter implements IDatabaseAdapter {
  abstract query(query: string): Promise<void>;
  abstract createMigrationTable(): Promise<void>;
  abstract getLatestMigration(): Promise<string>;
  abstract dispose(): void;
  abstract queryWithTransaction(querys: string[]): Promise<void>;

  async executeMigrationUp(migration: IMigration): Promise<void> {
    const querys = [];
    if (migration.beforeSql) {
      querys.push(migration.beforeSql);
    }

    querys.push(`INSERT INTO migrations (name) VALUES (${migration.name})`);

    if (migration.afterSql) {
      querys.push(migration.afterSql);
    }

    await this.queryWithTransaction(querys);
  }

  async executeMigrationDown(migration: IMigration): Promise<void> {
    await this.query(`${migration.downSql}`);
    await this.query(`DELETE FROM migrations WHERE name = ${migration.name}`);
  }
}
