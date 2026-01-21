import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

/**
 * CORS CONFIG (IMPORTANT)
 */
app.use(cors({
  origin: "https://task-priority-app-delta.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Task Priority Backend Running");
});

/**
 * MONGODB CONNECTION
 * (connect once – reuse connection)
 */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI!);
  isConnected = true;
  console.log("MongoDB connected");
}

connectDB();

/**
 * EXPORT APP FOR VERCEL
 */
export default app;
