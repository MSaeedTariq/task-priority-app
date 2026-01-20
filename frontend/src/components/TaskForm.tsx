// src/components/TaskForm.tsx
import { useState, type ChangeEvent, type FormEvent } from "react";
import * as taskService from "../api/taskService";
import type { TaskType } from "../types/task";

interface TaskFormProps {
  onTaskAdded: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [task, setTask] = useState<Omit<TaskType, "_id" | "completed">>({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await taskService.createTask(task);
      onTaskAdded();
      setTask({ title: "", description: "", dueDate: "", priority: "Medium" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={task.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-400 hover:cursor-pointer duration-300 transition"
      >
        Add Task
      </button>
    </form>
  );
}
