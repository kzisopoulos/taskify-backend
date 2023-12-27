import { PrismaClient, Task } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { RouteResponse, TaskRouteResponse, createTaskPayloadSchema } from "../interfaces/interfaces";

dotenv.config();
const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const tasks = await prisma.task.findMany({
      where: { userId: Number(userId) || 0 },
    });
    const response: RouteResponse<TaskRouteResponse[]> = {
      code: 200,
      error: null,
      success: true,
      message: "All tasks fetched successfully.",
      data: [...tasks],
    };
    res.status(200).json(response);
  } catch (error) {
    const response: RouteResponse<null> = {
      code: 404,
      data: null,
      error: "Not Found.",
      message: "Not Found.",
      success: false,
    };
    res.status(response.code).json(response);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    createTaskPayloadSchema.parse(req.body);
    const { title, priority, note, done, userId } = req.body as TaskRouteResponse;
    const newTask = await prisma.task.create({
      data: {
        title,
        priority,
        note,
        done,
        userId,
      },
    });
    const response: RouteResponse<TaskRouteResponse> = {
      code: 201,
      data: newTask,
      error: null,
      message: "Task created successfully.",
      success: true,
    };
    res.status(response.code).json(response);
  } catch (error) {
    const response: RouteResponse<null> = {
      code: 500,
      data: null,
      error: "Internal server error.",
      message: "Internal server error.",
      success: false,
    };
    res.status(response.code).json(response);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { title, priority, note, done } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { title, note, priority, done },
    });
    const response: RouteResponse<TaskRouteResponse> = {
      code: 200,
      data: updatedTask,
      error: null,
      message: "Task updated successfully.",
      success: true,
    };
    res.status(response.code).json(response);
  } catch (error) {
    const response: RouteResponse<null> = {
      code: 404,
      data: null,
      error: "Internal server error.",
      message: "Internal server error.",
      success: false,
    };
    res.status(response.code).json(response);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    await prisma.task.delete({
      where: { id: Number(taskId) },
    });
    const response: RouteResponse<unknown> = {
      code: 204,
      data: null,
      error: null,
      message: "No content.",
      success: true,
    };
    res.status(response.code).json(response);
  } catch (error) {
    const response: RouteResponse<null> = {
      code: 404,
      data: null,
      error: "Not Found",
      message: "Not Found",
      success: false,
    };
    res.status(response.code).json(response);
  }
};
