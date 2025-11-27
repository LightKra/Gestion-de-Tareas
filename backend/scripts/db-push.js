#!/usr/bin/env node
/* eslint-disable */
// Script para ejecutar drizzle-kit push con configuración SSL para Digital Ocean
// Configurar variables de entorno para aceptar certificados SSL autofirmados
process.env.PGSSLMODE = "no-verify";
// Deshabilitar verificación de certificados TLS (solo para desarrollo/producción con certificados autofirmados)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Importar y ejecutar drizzle-kit push
const { execSync } = require("child_process");

try {
  execSync("drizzle-kit push", {
    stdio: "inherit",
    env: {
      ...process.env,
      PGSSLMODE: "no-verify",
      NODE_TLS_REJECT_UNAUTHORIZED: "0",
    },
  });
} catch {
  process.exit(1);
}
