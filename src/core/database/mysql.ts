import {
  Pool,
  RowDataPacket,
  ConnectionOptions,
  createPool,
} from 'mysql2/promise';
import { BaseDatabaseAdapter } from './base';

export class MySqlDatabaseAdapter extends BaseDatabaseAdapter {
  private readonly db: Pool;

  private readonly options: ConnectionOptions;

  constructor(private readonly connectionString: string) {
    super();

    this.options = {
      multipleStatements: true,
    };

    this.db = createPool(
      `${this.connectionString}?${new URLSearchParams(
        this.options as Record<string, string>
      ).toString()}`
    );
  }

  async dispose(): Promise<void> {
    await this.db.end();
  }

  async createMigrationTable(): Promise<void> {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  }

  async getLatestMigration(): Promise<string> {
    const [rows] = await this.db.query<RowDataPacket[]>(`
      SELECT name FROM migrations ORDER BY id DESC LIMIT 1;
    `);

    return rows[0]?.name ?? undefined;
  }

  async query(query: string): Promise<void> {
    await this.db.query(query);
  }

  async queryWithTransaction(queries: string[]): Promise<void> {
    try {
      const connection = await this.db.getConnection();
      await connection.beginTransaction();
      for await (const query of queries) {
        await connection.query(query);
      }
      await connection.commit();
      connection.release();
    } catch (error) {
      console.error(error);
    }
  }
}
