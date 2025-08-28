import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import "./TiffinDetail.css";

const TiffinDetail = () => {
  const { id } = useParams();
  const [tiffin, setTiffin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchTiffin = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/tiffins/${id}`);
        setTiffin(response.data);
      } catch (error) {
        console.error("Error fetching tiffin detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTiffin();
  }, [id]);

  if (loading) {
    return (
      <div className="tiffin-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading tiffin details...</p>
      </div>
    );
  }

  if (!tiffin) {
    return (
      <div className="tiffin-detail-error">
        <div className="error-icon">😕</div>
        <h2>Tiffin Service Not Found</h2>
        <p>Sorry, we couldn't find the tiffin service you're looking for.</p>
        <Link to="/tiffin" className="back-button">
          ← Back to Tiffin Services
        </Link>
      </div>
    );
  }

  return (
    <div className="tiffin-detail-container">
      <Link to="/tiffin" className="back-button">
        ← Back to Tiffin Services
      </Link>

      <div className="tiffin-detail-card">
        <div className="tiffin-image-section">
          <div className={`image-container ${imageLoaded ? 'loaded' : ''}`}>
            <div className="image-placeholder">
              <span className="food-icon">🍱</span>
            </div>
            <img 
              src={tiffin.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt={tiffin.name}
              onLoad={() => setImageLoaded(true)}
              className="tiffin-image"
            />
            <div className="image-overlay"></div>
          </div>
          <div className="price-badge">
            <span className="price-amount">₹{tiffin.price}</span>
            <span className="price-period">/month</span>
          </div>
        </div>

        <div className="tiffin-content">
          <div className="tiffin-header">
            <h1 className="tiffin-title">{tiffin.name}</h1>
            {tiffin.rating && (
              <div className="rating-badge">
                <span className="star-icon">⭐</span>
                <span className="rating-value">{tiffin.rating}</span>
                <span className="rating-text">/5</span>
              </div>
            )}
          </div>

          <p className="tiffin-description">{tiffin.description}</p>

          <div className="tiffin-details-grid">
            <div className="detail-item">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <span className="detail-label">Location</span>
                <span className="detail-value">{tiffin.location}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">📞</div>
              <div className="detail-content">
                <span className="detail-label">Contact</span>
                <span className="detail-value">{tiffin.contact}</span>
              </div>
            </div>

            {tiffin.cuisineType && (
              <div className="detail-item">
                <div className="detail-icon">🌶️</div>
                <div className="detail-content">
                  <span className="detail-label">Cuisine Type</span>
                  <span className="detail-value">{tiffin.cuisineType}</span>
                </div>
              </div>
            )}

            {tiffin.mealsPerDay && (
              <div className="detail-item">
                <div className="detail-icon">🍽️</div>
                <div className="detail-content">
                  <span className="detail-label">Meals per Day</span>
                  <span className="detail-value">{tiffin.mealsPerDay}</span>
                </div>
              </div>
            )}

            {tiffin.deliveryAvailable && (
              <div className="detail-item">
                <div className="detail-icon">🚚</div>
                <div className="detail-content">
                  <span className="detail-label">Delivery</span>
                  <span className="detail-value">Available</span>
                </div>
              </div>
            )}

            {tiffin.specialFeatures && (
              <div className="detail-item">
                <div className="detail-icon">✨</div>
                <div className="detail-content">
                  <span className="detail-label">Special Features</span>
                  <span className="detail-value">{tiffin.specialFeatures}</span>
                </div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button className="contact-button">
              <span className="button-icon">📞</span>
              Contact Now
            </button>
            <button className="order-button">
              <span className="button-icon">🛒</span>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="additional-sections">
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-placeholder">
            <p>No reviews yet. Be the first to review this tiffin service!</p>
          </div>
        </div>

        <div className="similar-tiffins">
          <h3>Similar Tiffin Services</h3>
          <div className="similar-placeholder">
            <p>Explore other tiffin services in your area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiffinDetail;