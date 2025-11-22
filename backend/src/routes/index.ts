import { Router, Request, Response } from "express";
import listsRoutes from "./lists.routes";
import tasksRoutes from "./tasks.routes";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "API Routes",
    version: "1.0.0",
    endpoints: {
      lists: "/api/lists",
      tasks: "/api/tasks",
    },
  });
});

// Rutas de la API
router.use("/lists", listsRoutes);
router.use("/tasks", tasksRoutes);

export default router;
