import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type * as schema from './schema';
import type { Kyselify } from 'drizzle-orm/kysely';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core/table';

export interface DatabaseClientOptions {
  databaseUrl?: string;
  max?: number;
}

type Schema = typeof schema;
type DatabaseSchema = {
  [K in keyof Schema]: Schema[K] extends PgTableWithColumns<any>
    ? Kyselify<Schema[K]>
    : never;
};

export function createPool(options?: DatabaseClientOptions) {
  return new Pool({
    connectionString: options?.databaseUrl,
    max: options?.max,
  });
}

export function createDb(options?: DatabaseClientOptions) {
  const pool = createPool(options);
  const db = new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({
      pool,
    }),
  });

  return { db, pool };
}

export type DatabaseInstance = ReturnType<typeof createDb>['db'];
export type DatabaseConnection = ReturnType<typeof createPool>;
