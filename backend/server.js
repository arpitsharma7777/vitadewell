import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import tiffinRoutes from "./routes/tiffinRoutes.js"; // ✅ Import Tiffin Routes
import bookRoutes from "./routes/bookRoutes.js";
// Initialize environment variables and database connection
dotenv.config();
connectDB();

// Initialize Express app
const app = express();

// ✅ Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies (if needed)
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tiffins", tiffinRoutes); // ✅ Add Tiffin Routes
app.use("/api/books", bookRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
