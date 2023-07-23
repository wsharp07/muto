import createPostgresConnectionPool, {
  type ConnectionPool,
  sql,
} from '@databases/pg';
import { IMigration, type IDatabaseAdapter } from '../interface';

export class PostgresDatabaseAdapter implements IDatabaseAdapter {
  private readonly db: ConnectionPool;

  constructor(private readonly connectionString: string) {
    this.db = createPostgresConnectionPool({
      bigIntMode: 'bigint',
      connectionString: this.connectionString,
    });
  }

  async dispose(): Promise<void> {
    await this.db.dispose();
  }

  async createMigrationTable(): Promise<void> {
    await this.db.query(sql`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  }

  async getLatestMigration(): Promise<string> {
    const result = await this.db.query(sql`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1;
    `);

    return result[0]?.name ?? undefined;
  }

  async executeMigrationUp(migration: IMigration): Promise<void> {
    await this.db.tx(async (transaction) => {
      if (migration.before) {
        await transaction.query(sql`${migration.before}`);
      }

      await transaction.query(sql`${migration.up}`);

      await transaction.query(
        sql`INSERT INTO migrations (name) VALUES (${migration.name})`
      );

      if (migration.after) {
        await transaction.query(sql`${migration.after}`);
      }
    });
  }

  async executeMigrationDown(migration: IMigration): Promise<void> {
    await this.db.tx(async (transaction) => {
      await transaction.query(sql`${migration.down}`);
    });
  }

  async query(query: string): Promise<void> {
    await this.db.query(sql`${query}`);
  }
}
