export interface TaskType {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}
