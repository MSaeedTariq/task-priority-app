// src/App.tsx
import TaskTable from "./components/TaskTable";

export default function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-10"
    >
      <h1 className="text-4xl md:text-5xl  font-medium text-center mb-12 text-white/90">
        Task Priority App
        <span className="block mx-auto mt-4 h-[2px] w-32 bg-white/30 rounded-full"></span>
      </h1>

      <TaskTable />
    </div>
  );
}
