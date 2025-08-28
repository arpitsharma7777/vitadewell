import express from "express";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getUserRooms,
} from "../controllers/roomController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRoom);

router.get("/", getRooms);

router.get("/:id", getRoomById);

router.get("/myrooms", protect, getUserRooms);

router.put("/:id", protect, updateRoom);

router.delete("/:id", protect, deleteRoom);

export default router;
