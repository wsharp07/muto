import createPostgresConnectionPool, {
  type ConnectionPool,
  sql,
} from '@databases/pg';
import { type IDatabaseAdapter } from '../interface';

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

  async getLatestMigration(): Promise<void> {
    await this.db.query(sql`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1;
    `);
  }

  async query(query: string): Promise<void> {
    await this.db.query(sql`${query}`);
  }
}
