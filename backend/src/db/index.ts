import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Crear conexión a PostgreSQL usando DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Crear instancia de Drizzle con el esquema
export const db = drizzle(pool, { schema });

// Exportar el esquema para uso en otras partes de la aplicación
export { schema };
