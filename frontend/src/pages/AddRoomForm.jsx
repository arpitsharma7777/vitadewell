import "./AddRoomForm.css";
import React, { useState } from "react";
import { createRoom } from "../api/roomApi";

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    genderPreference: "Any",
    smokingAllowed: false,
    foodPreference: "Any",
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // For now, just send image file names (backend expects array of strings)
      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.images.map((file) => file.name),
      };
      await createRoom(roomData);
      setSuccess("Room added successfully!");
      setFormData({
        title: "",
        location: "",
        price: "",
        genderPreference: "Any",
        smokingAllowed: false,
        foodPreference: "Any",
        description: "",
        images: [],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-room-form-container">
      <h2>Add a New Room</h2>
      <form onSubmit={handleSubmit}>
        <label>Title
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>Location
          <input name="location" value={formData.location} onChange={handleChange} required />
        </label>
        <label>Price
          <input name="price" type="number" value={formData.price} onChange={handleChange} required />
        </label>
        <label>Gender Preference
          <select name="genderPreference" value={formData.genderPreference} onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>Smoking Allowed
          <input name="smokingAllowed" type="checkbox" checked={formData.smokingAllowed} onChange={handleChange} />
        </label>
        <label>Food Preference
          <select name="foodPreference" value={formData.foodPreference} onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <label>Description
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>Images (filenames only for now)
          <input name="images" type="file" multiple onChange={handleImageChange} />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Room"}</button>
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}
      </form>
    </div>
  );
};

export default AddRoomForm;
