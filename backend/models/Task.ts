import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate: Date;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
