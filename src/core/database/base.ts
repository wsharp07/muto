import { IDatabaseAdapter, IMigration } from '@core/interface';
import { IDisposable } from '@core/using';

export abstract class BaseDatabaseAdapter
  implements IDatabaseAdapter, IDisposable
{
  private readonly migrationTableName = 'migrations';

  abstract query(query: string): Promise<void>;
  abstract createMigrationTable(): Promise<void>;
  abstract getLatestMigration(): Promise<string>;
  abstract dispose(): Promise<void>;
  abstract queryWithTransaction(queries: string[]): Promise<void>;

  async executeMigrationUp(migration: IMigration): Promise<void> {
    const queries: string[] = [];
    if (migration.beforeSql) {
      queries.push(migration.beforeSql);
    }

    queries.push(
      migration.upSql,
      `INSERT INTO ${this.migrationTableName} (name) VALUES (${migration.name})`
    );

    if (migration.afterSql) {
      queries.push(migration.afterSql);
    }

    await this.queryWithTransaction(queries);
  }

  async executeMigrationDown(migration: IMigration): Promise<void> {
    const queries: string[] = [];
    queries.push(
      migration.downSql,
      `DELETE FROM ${this.migrationTableName} WHERE name = ${migration.name}`
    );
    await this.queryWithTransaction(queries);
  }
}
