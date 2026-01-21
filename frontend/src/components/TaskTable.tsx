// src/components/TaskTable.tsx
import { useEffect, useState } from "react";
import * as taskService from "../api/taskService";
import type { TaskType } from "../types/task";
import TaskForm from "./TaskForm";
import Swal, { type SweetAlertIcon } from "sweetalert2";

export default function TaskTable() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    const data = await taskService.fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleCompleted = async (task: TaskType) => {
    setLoading(true);
    await taskService.updateTask(task._id, {
      completed: !task.completed,
    });
    loadTasks();
  };
  const deleteTask = async (task: TaskType) => {
    setLoading(true);
    await taskService.deleteTask(task._id);
    loadTasks();
    NotificationMessage(
      "success",
      "Task Deleted",
      "Your task has been deleted successfully!",
    );
  };

  const priorityStyles: Record<string, string> = {
    High: "bg-red-500/90 shadow-red-500/50",
    Medium: "bg-yellow-400/90 shadow-yellow-400/50",
    Low: "bg-green-500/90 shadow-green-500/50",
  };

  const statusBadge = (completed: boolean) =>
    completed ? (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300">
        Completed
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300">
        Pending
      </span>
    );

  const handleTaskAdded = async () => {
    setOpenModal(false);
    await loadTasks();
    NotificationMessage(
      "success",
      "Task Added",
      "Your task has been added successfully!",
    );
  };

  const NotificationMessage = (
    icon: SweetAlertIcon,
    title: string,
    text: string,
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      background: "#31a821ff",
      color: "#fff",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="relative">
      {/* Full-page loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {/* Glass Table Container */}
      <div className="overflow-x-auto rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-white/10 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Due Date</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-lg capitalize text-center text-gray-300"
                >
                  No tasks created
                </td>
              </tr>
            )}

            {tasks.map((task, index) => (
              <tr
                key={task._id}
                className="border-t border-white/10 hover:bg-white/10 transition"
              >
                <td className="p-4 font-medium text-center">{index + 1}</td>
                <td className="p-4 font-medium">{task.title}</td>
                <td className="p-4 text-gray-300">{task.description}</td>
                <td className="p-4">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-md ${priorityStyles[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-3">
                  {statusBadge(task.completed)}
                </td>
                <td className="space-x-5">
                  {!task.completed && (
                    <button
                      onClick={() => toggleCompleted(task)}
                      className="text-xs px-3 py-1 rounded border border-white/30 hover:bg-white/20 hover:cursor-pointer transition"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task)}
                    className="text-xs px-3 py-1 rounded bg-red-800 border border-red-800 hover:bg-red-700 hover:cursor-pointer transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-400 text-white px-6 py-2 rounded-full hover:cursor-pointer shadow-lg shadow-indigo-500/40 transition duration-300"
        >
          Add Task
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg mx-4">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute -top-4 -right-4 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-red-400 transition"
            >
              ✕
            </button>

            <TaskForm onTaskAdded={handleTaskAdded} />
          </div>
        </div>
      )}
    </div>
  );
}
