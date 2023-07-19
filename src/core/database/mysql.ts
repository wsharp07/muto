import createMysqlConnectionPool, {
  ConnectionPool,
  sql,
} from '@databases/mysql';
import { IDatabaseAdapter } from '../interface';

export class MySqlDatabaseAdapter implements IDatabaseAdapter {
  private readonly db: ConnectionPool;
  constructor(private readonly connectionString: string) {
    this.db = createMysqlConnectionPool({
      bigIntMode: 'bigint',
      connectionString: this.connectionString,
    });
  }
  dispose(): void {
    this.db.dispose();
  }

  async createMigrationTable(): Promise<void> {
    this.db.query(sql`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  }
  async getLatestMigration(): Promise<void> {
    this.db.query(sql`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1;
    `);
  }

  async query(query: string): Promise<void> {
    await this.db.query(sql`${query}`);
  }
}
