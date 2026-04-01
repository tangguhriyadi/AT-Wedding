#!/usr/bin/env node
/**
 * Database migration script - applies SQL migration files directly.
 * Usage: node scripts/migrate.js
 * Requires: DATABASE_* environment variables (or .env file)
 */
const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')

// Load .env if present
const envPath = path.join(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx < 0) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 5432),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionTimeoutMillis: 15000,
})

async function main() {
  const client = await pool.connect()
  console.log('Connected to database')

  try {
    // Create migrations tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id serial PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      )
    `)

    const migrationsDir = path.join(__dirname, '..', 'src', 'db', 'migrations')
    const sqlFiles = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort()

    for (const file of sqlFiles) {
      const { rows } = await client.query(
        'SELECT id FROM __drizzle_migrations WHERE hash = $1',
        [file]
      )
      if (rows.length > 0) {
        console.log(`Skipping already applied: ${file}`)
        continue
      }

      console.log(`Applying: ${file}`)
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
      try {
        await client.query('BEGIN')
        await client.query(sql)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        // If the error is "already exists", mark as applied and continue
        if (err.code === '42P07' || err.message.includes('already exists')) {
          console.log(`  (table already exists, marking as applied)`)
        } else {
          throw err
        }
      }
      await client.query(
        'INSERT INTO __drizzle_migrations (hash, created_at) VALUES ($1, $2)',
        [file, Date.now()]
      )
      console.log(`Applied: ${file}`)
    }

    console.log('All migrations applied successfully')
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch(err => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
