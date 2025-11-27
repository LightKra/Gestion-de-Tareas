/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

// Función para modificar la URL de conexión para aceptar certificados SSL autofirmados
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || "";
  if (!url) return "";

  // Si la URL ya tiene parámetros de consulta, agregar sslmode
  // Si no, agregar ?sslmode=no-verify para aceptar certificados autofirmados
  try {
    const urlObj = new URL(url);
    // Agregar parámetro para aceptar certificados autofirmados
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

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
