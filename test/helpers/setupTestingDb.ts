import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import path from 'path'
import postgres from 'postgres'
import { drizzleSchema } from 'src/server/infrastructure/drizzle'

export async function setupDockerTestDb() {
  const POSTGRES_USER = 'test';
  const POSTGRES_PASSWORD = 'test';
  const POSTGRES_DB = 'test';

  const container = await new PostgreSqlContainer()
    .withEnvironment({
      POSTGRES_USER: POSTGRES_USER,
      POSTGRES_PASSWORD: POSTGRES_PASSWORD,
      POSTGRES_DB: POSTGRES_DB,
    })
    .withExposedPorts(5432)
    .start();

  const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${container.getHost()}:${container.getFirstMappedPort()}/${POSTGRES_DB}`;
  const client = postgres(connectionString);

  const db = drizzle(client, { schema: drizzleSchema });

  await migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle-migration'), });

  const confirmDatabaseReady = await db.execute(sql`SELECT 1`);

  return { container, db, confirmDatabaseReady, client }
}