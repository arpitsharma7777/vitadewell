
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
  bookImage: { type: String, required: true },
  desiredBook: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;
