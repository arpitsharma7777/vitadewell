
import { useState } from "react";
import apiClient from "../api/apiClient";
import "./AddTiffinForm.css";

const AddTiffinForm = ({ onTiffinAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/tiffins", formData);
      alert("✅ Tiffin Service Added!");
      onTiffinAdded();
      setFormData({
        name: "",
        description: "",
        price: "",
        location: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error adding tiffin service:", error);
      alert("❌ Failed to add Tiffin Service");
    }
  };

  return (
    <form className="add-tiffin-form" onSubmit={handleSubmit}>
      <h3>Add New Tiffin Service</h3>
      <input
        type="text"
        name="name"
        placeholder="Tiffin Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <button type="submit">➕ Add Tiffin</button>
    </form>
  );
};

export default AddTiffinForm;
