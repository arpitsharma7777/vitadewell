import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import "./TiffinServices.css";
import AddTiffinForm from "../components/AddTiffinForm";

const TiffinServices = () => {
  const [tiffins, setTiffins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchTiffins = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/tiffins");
      setTiffins(response.data);
    } catch (error) {
      console.error("Error fetching tiffin services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiffins();
  }, []);

  const handleTiffinAdded = () => {
    fetchTiffins();
    setShowForm(false);
  };

  return (
    <div className="tiffin-container">
      <div className="tiffin-header">
        <h1 className="tiffin-title">
          <span className="title-icon">🍱</span>
          Available Tiffin Services
        </h1>
        <p className="tiffin-subtitle">Discover and order from local tiffin services</p>
      </div>

      <div className="tiffin-actions">
        <button 
          className="add-tiffin-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <span className="btn-icon">{showForm ? '✕' : '+'}</span>
          {showForm ? 'Close Form' : 'Add Tiffin Service'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <AddTiffinForm onTiffinAdded={handleTiffinAdded} />
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tiffin services...</p>
        </div>
      ) : tiffins.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>No tiffin services available yet</h3>
          <p>Be the first to add a tiffin service in your area!</p>
          <button 
            className="cta-button"
            onClick={() => setShowForm(true)}
          >
            Add Tiffin Service
          </button>
        </div>
      ) : (
        <div className="tiffin-grid">
          {tiffins.map((tiffin, index) => (
            <Link 
              to={`/tiffin/${tiffin._id}`} 
              key={tiffin._id} 
              className="tiffin-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-image">
                <div className="image-placeholder">
                  <span className="food-icon">🍲</span>
                </div>
                <div className="price-tag">₹{tiffin.price}/month</div>
              </div>
              
              <div className="card-content">
                <h3 className="tiffin-name">{tiffin.name}</h3>
                <p className="tiffin-description">{tiffin.description}</p>
                
                <div className="tiffin-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{tiffin.location}</span>
                  </div>
                  
                  {tiffin.cuisineType && (
                    <div className="detail-item">
                      <span className="detail-icon">🌶️</span>
                      <span className="detail-text">{tiffin.cuisineType}</span>
                    </div>
                  )}
                  
                  {tiffin.rating && (
                    <div className="detail-item">
                      <span className="detail-icon">⭐</span>
                      <span className="detail-text">{tiffin.rating}/5</span>
                    </div>
                  )}
                </div>
                
                <div className="view-details">
                  View Details <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TiffinServices;