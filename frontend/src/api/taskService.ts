// src/api/taskService.ts
import axios from "axios";
import type { TaskType } from "../types/task";

const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`

export const fetchTasks = async (): Promise<TaskType[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task: Omit<TaskType, "_id" | "completed">) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (id: string, task: Partial<TaskType>) => {
  const res = await axios.put(`${API_URL}/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
