import express from "express";
import {
  createTiffin,
  getTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
} from "../controllers/tiffinController.js";

const router = express.Router();


router.post("/", createTiffin);

router.get("/", getTiffins);

router.get("/:id", getTiffinById);

router.put("/:id", updateTiffin);

router.delete("/:id", deleteTiffin);

export default router;
