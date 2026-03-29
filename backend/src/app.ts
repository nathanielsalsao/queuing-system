import express from "express";
import cors from "cors";
import testRoutes from "./routes/testRoutes";
import queueRoutes from "./routes/queueRoutes"; // 1. Import the new routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);
app.use("/api/queue", queueRoutes); // 2. Mount the queue routes at /api/queue

export default app;