/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

// Configuración para aceptar certificados SSL autofirmados (necesario para Digital Ocean)
// En desarrollo local, esto no afectará si no se usa SSL
const dbUrl = process.env.DATABASE_URL || "";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl,
    // Aceptar certificados SSL autofirmados (necesario para Digital Ocean PostgreSQL)
    ssl: dbUrl ? { rejectUnauthorized: false } : undefined,
  },
});
