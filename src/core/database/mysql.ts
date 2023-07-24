import createMysqlConnectionPool, {
  ConnectionPool,
  sql,
} from '@databases/mysql';
import { BaseDatabaseAdapter } from './base';

export class MySqlDatabaseAdapter extends BaseDatabaseAdapter {
  private readonly db: ConnectionPool;

  constructor(private readonly connectionString: string) {
    super();
    this.db = createMysqlConnectionPool({
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
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  }

  async getLatestMigration(): Promise<string> {
    const result = await this.db.query(sql`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1;
    `);

    return result[0]?.name ?? undefined;
  }

  async query(query: string): Promise<void> {
    await this.db.query(sql`${query}`);
  }

  async queryWithTransaction(queries: string[]): Promise<void> {
    this.db.tx(async (transaction) => {
      for await (const query of queries) {
        await transaction.query(sql`${query}`);
      }
    });
  }
}
