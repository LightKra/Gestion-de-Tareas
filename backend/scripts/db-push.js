#!/usr/bin/env node
/* eslint-disable */
// Script para ejecutar drizzle-kit push con configuración SSL apropiada
// Detectar si es una conexión local y configurar SSL en consecuencia
const dbUrl = process.env.DATABASE_URL || "";
const isLocal = dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1");

if (isLocal) {
  // Para conexiones locales, deshabilitar SSL completamente
  process.env.PGSSLMODE = "disable";
} else {
  // Para conexiones remotas (Digital Ocean, etc.), aceptar certificados autofirmados
  process.env.PGSSLMODE = "no-verify";
  // Deshabilitar verificación de certificados TLS (solo para desarrollo/producción con certificados autofirmados)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Importar y ejecutar drizzle-kit push
const { execSync } = require("child_process");

try {
  const env = { ...process.env };
  if (isLocal) {
    env.PGSSLMODE = "disable";
  } else {
    env.PGSSLMODE = "no-verify";
    env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  execSync("drizzle-kit push", {
    stdio: "inherit",
    env,
  });
} catch {
  process.exit(1);
}
