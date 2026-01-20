import Task from "../models/Task";
import { NextFunction, Request, Response } from "express";

// GET /tasks - sorted by priority first, then due date, completed tasks at the bottom
export const getTasks = async (req: Request, res: Response , next: NextFunction) => {
  try {
    const tasks = await Task.find();

    // Map priority to numbers - smaller number = higher priority
    const priorityMap = { High: 1, Medium: 2, Low: 3 };

    tasks.sort((a, b) => {
      // Completed tasks go to the bottom
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      if (a.completed && b.completed) return 0; // both completed, keep order

      // Compare priority
      if (priorityMap[a.priority] !== priorityMap[b.priority]) {
        return priorityMap[a.priority] - priorityMap[b.priority];
      }

      // Compare due date
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    next(error);
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response , next: NextFunction) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response , next: NextFunction) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
