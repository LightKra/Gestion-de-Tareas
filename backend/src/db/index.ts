import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Función para modificar la URL de conexión con configuración SSL apropiada
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || "";
  if (!url) return "";

  // Detectar si es una conexión local (localhost o 127.0.0.1)
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");

  // Si es local, no modificar la URL (SSL se desactiva en la configuración del Pool)
  if (isLocal) {
    return url;
  }

  // Para conexiones remotas, agregar sslmode=no-verify
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("sslmode", "no-verify");
    return urlObj.toString();
  } catch {
    // Si la URL no es válida o no se puede parsear, intentar agregar el parámetro manualmente
    if (url.includes("?")) {
      return `${url}&sslmode=no-verify`;
    } else {
      return `${url}?sslmode=no-verify`;
    }
  }
}

// Detectar si es una conexión local para configurar SSL
const dbUrl = process.env.DATABASE_URL || "";
const isLocal = dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1");

// Crear conexión a PostgreSQL usando DATABASE_URL
const pool = new Pool({
  connectionString: getDatabaseUrl(),
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

// Crear instancia de Drizzle con el esquema
export const db = drizzle(pool, { schema });

// Exportar el esquema para uso en otras partes de la aplicación
export { schema };
