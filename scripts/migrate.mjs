// Applies pending SQL migrations from ./migrations in filename order, each in
// its own transaction. Usage: `npm run db:migrate` (uses DATABASE_URL_UNPOOLED).
import { readdir, readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL_UNPOOLED;
if (!connectionString) {
  throw new Error("DATABASE_URL_UNPOOLED is not set.");
}

const migrationsDir = new URL("../migrations/", import.meta.url);
const pool = new Pool({ connectionString });
const client = await pool.connect();

try {
  await client.query(`
    create table if not exists schema_migrations (
      version text primary key,
      applied_at timestamptz not null default now()
    )
  `);

  const { rows } = await client.query("select version from schema_migrations");
  const applied = new Set(rows.map((row) => row.version));
  const files = (await readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = await readFile(new URL(file, migrationsDir), "utf8");
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query(
        "insert into schema_migrations (version) values ($1)",
        [file],
      );
      await client.query("commit");
    } catch (error) {
      await client.query("rollback");
      throw new Error(`Migration ${file} failed: ${error.message}`);
    }
    console.log(`Applied ${file}`);
    count++;
  }

  console.log(
    count ? `${count} migration(s) applied.` : "Database is up to date.",
  );
} finally {
  client.release();
  await pool.end();
}
