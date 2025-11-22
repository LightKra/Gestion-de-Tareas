import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import * as schema from "./schema";

// Crear conexión a la base de datos SQLite
// Ruta absoluta: siempre apunta a backend/database.db independientemente del CWD
const dbPath = path.join(__dirname, "../../database.db");
const sqlite = new Database(dbPath);

// Crear instancia de Drizzle con el esquema
export const db = drizzle(sqlite, { schema });

// Exportar el esquema para uso en otras partes de la aplicación
export { schema };
