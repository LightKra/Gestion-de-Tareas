import { Router } from "express";
import * as listsController from "../controllers/lists.controller";

const router = Router();

// Rutas CRUD para listas
router.get("/", listsController.getAll);
router.get("/:id", listsController.getById);
router.post("/", listsController.create);
router.put("/:id", listsController.update);
router.delete("/:id", listsController.deleteList);

export default router;

