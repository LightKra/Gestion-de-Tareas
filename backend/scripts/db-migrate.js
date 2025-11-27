#!/usr/bin/env node
/* eslint-disable */
// Script alternativo para ejecutar migraciones SQL directamente usando Drizzle ORM
// Este script no requiere el archivo schema.ts, solo los archivos SQL de migración
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Detectar si es una conexión local y configurar SSL
const dbUrl = process.env.DATABASE_URL || "";
const isLocal = dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1");

// Configurar SSL
const poolConfig = {
  connectionString: dbUrl,
};

if (!isLocal) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// Función para ejecutar una migración SQL
async function runMigration(sqlFile) {
  const sql = fs.readFileSync(sqlFile, "utf8");
  // Dividir por statement-breakpoint y limpiar cada statement
  const statements = sql
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const statement of statements) {
      // Limpiar el statement de comentarios y espacios
      const cleaned = statement
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim();

      if (cleaned) {
        await client.query(cleaned);
      }
    }

    await client.query("COMMIT");
    console.log(`✓ Migración aplicada: ${path.basename(sqlFile)}`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      `✗ Error en migración ${path.basename(sqlFile)}:`,
      error.message
    );
    throw error;
  } finally {
    client.release();
  }
}

// Función principal
async function main() {
  try {
    console.log("Iniciando migraciones de base de datos...");
    console.log(`Entorno: ${process.env.NODE_ENV || "desarrollo"}`);
    console.log(`SSL Mode: ${isLocal ? "disable" : "no-verify"}`);

    // Buscar archivos de migración en el directorio drizzle
    const drizzleDir = path.join(__dirname, "..", "drizzle");

    if (!fs.existsSync(drizzleDir)) {
      console.error("✗ Directorio drizzle no encontrado");
      process.exit(1);
    }

    const files = fs
      .readdirSync(drizzleDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    if (files.length === 0) {
      console.log("ℹ No se encontraron archivos de migración");
      return;
    }

    console.log(`Encontradas ${files.length} migración(es)`);

    // Verificar qué migraciones ya se han aplicado
    const client = await pool.connect();
    let appliedMigrations = [];

    try {
      // Crear tabla de seguimiento de migraciones si no existe
      await client.query(`
        CREATE TABLE IF NOT EXISTS drizzle_migrations (
          id SERIAL PRIMARY KEY,
          hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);

      // Obtener migraciones ya aplicadas
      const result = await client.query("SELECT hash FROM drizzle_migrations");
      appliedMigrations = result.rows.map((r) => r.hash);
    } catch (error) {
      // Si hay error, asumir que la tabla no existe y continuar
      console.log("ℹ Tabla de migraciones no existe, se creará");
    } finally {
      client.release();
    }

    // Aplicar migraciones
    for (const file of files) {
      const filePath = path.join(drizzleDir, file);
      const fileHash = path.basename(file, ".sql");

      if (appliedMigrations.includes(fileHash)) {
        console.log(`⊘ Migración ya aplicada: ${file}`);
        continue;
      }

      await runMigration(filePath);

      // Registrar migración aplicada
      const client = await pool.connect();
      try {
        await client.query(
          "INSERT INTO drizzle_migrations (hash) VALUES ($1)",
          [fileHash]
        );
      } finally {
        client.release();
      }
    }

    console.log("✓ Todas las migraciones se aplicaron exitosamente");
    await pool.end();
  } catch (error) {
    console.error("✗ Error al aplicar migraciones:", error.message);
    console.error(error);
    await pool.end();
    process.exit(1);
  }
}

main();
