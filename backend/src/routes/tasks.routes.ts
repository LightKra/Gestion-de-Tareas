import { Router } from "express";
import * as tasksController from "../controllers/tasks.controller";

const router = Router();

// Rutas CRUD para tareas
router.get("/", tasksController.getAll);
router.get("/without-list", tasksController.getWithoutList);
router.get("/completed", tasksController.getCompleted);
router.get("/pending", tasksController.getPending);
router.get("/list/:listId", tasksController.getByListId);
router.get("/:id", tasksController.getById);
router.post("/", tasksController.create);
router.put("/:id", tasksController.update);
router.patch("/:id/complete", tasksController.markAsCompleted);
router.patch("/:id/pending", tasksController.markAsPending);
router.delete("/:id", tasksController.deleteTask);

export default router;

