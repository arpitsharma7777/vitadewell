
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import "./AddTiffinForm.css";

const AddTiffinForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    contact: "",
    foodType: "Vegetarian",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/tiffins", formData);
      alert("Tiffin service added successfully!");
      navigate("/tiffin");
    } catch (error) {
      console.error("Error adding tiffin service:", error);
      alert("Failed to add tiffin service. Please try again.");
    }
  };

  return (
    <div className="add-tiffin-form">
      <h2>➕ Add New Tiffin Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price (₹/month):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Food Type:
          <select name="foodType" value={formData.foodType} onChange={handleChange} required>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Both">Both</option>
          </select>
        </label>

        <button type="submit">Add Tiffin Service</button>
      </form>
    </div>
  );
};

export default AddTiffinForm;
