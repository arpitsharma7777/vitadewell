import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../api/bookApi";
import "./AddBookForm.css";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    owner: "",
    bookImage: "",
    desiredBook: "",
    email: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook(bookData);
      alert("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Try again.");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(bookData).map((field) => (
          <div key={field} className="form-group">
            <label>{field}:</label>
            <input
              type="text"
              name={field}
              value={bookData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
