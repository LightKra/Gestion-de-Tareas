/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

// Función para modificar la URL de conexión con configuración SSL apropiada
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || "";
  if (!url) return "";

  // Detectar si es una conexión local (localhost o 127.0.0.1)
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
  const sslMode = isLocal ? "disable" : "no-verify";

  try {
    const urlObj = new URL(url);
    // Agregar parámetro SSL según el tipo de conexión
    urlObj.searchParams.set("sslmode", sslMode);
    return urlObj.toString();
  } catch {
    // Si la URL no es válida o no se puede parsear, intentar agregar el parámetro manualmente
    if (url.includes("?")) {
      return `${url}&sslmode=${sslMode}`;
    } else {
      return `${url}?sslmode=${sslMode}`;
    }
  }
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
