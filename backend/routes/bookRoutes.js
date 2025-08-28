// backend/routes/bookRoutes.js
import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Book Routes
router.post("/", createBook);       // Add a new book
router.get("/", getBooks);          // Get all books
router.get("/:id", getBookById);    // Get a book by ID
router.put("/:id", updateBook);     // Update a book by ID
router.delete("/:id", deleteBook);  // Delete a book by ID

export default router;
