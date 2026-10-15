import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set.");
}

/**
 * Tagged-template SQL over Neon's HTTP driver. Interpolated values are always
 * sent as query parameters, never concatenated into the SQL text.
 */
export const sql = neon(databaseUrl);
