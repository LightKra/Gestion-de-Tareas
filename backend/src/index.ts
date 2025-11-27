import express, { Request, Response } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/index";
import cors from "cors";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Servidor Express con TypeScript funcionando correctamente",
    status: "OK",
  });
});

// Ruta de health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

console.log("Valor de process.env.PORT:", process.env.PORT);
console.log("Valor final de PORT:", PORT);
// Rutas de la API
app.use("/api", apiRoutes);

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
