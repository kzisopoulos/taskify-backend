import express from "express";
import * as taskController from "../controllers/task.controller";

const router = express.Router();

router.get("/:userId", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:taskId", taskController.updateTask);
router.delete("/taskId", taskController.deleteTask);

export { router };
