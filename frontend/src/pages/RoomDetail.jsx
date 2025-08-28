import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRoomById } from "../api/roomApi";
import "./RoomDetail.css";

const RoomDetail = () => {
  const { id } = useParams(); 
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getRoom = async () => {
      try {
        setLoading(true);
        const roomData = await fetchRoomById(id);
        setRoom(roomData);
      } catch (error) {
        console.error("Error loading room:", error);
      } finally {
        setLoading(false);
      }
    };

    getRoom();
  }, [id]);

  const nextImage = () => {
    if (room.images) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room.images) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  if (loading) {
    return (
      <div className="room-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="room-detail-error">
        <div className="error-icon">😕</div>
        <h2>Room Not Found</h2>
        <p>Sorry, we couldn't find the room you're looking for.</p>
        <Link to="/rooms" className="back-button">
          ← Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="room-detail-container">
      <Link to="/rooms" className="back-button">
        ← Back to Rooms
      </Link>

      <div className="room-detail-card">
        {/* Image Gallery */}
        <div className="room-gallery">
          <div className="gallery-main">
            <div className={`image-container ${imageLoaded ? 'loaded' : ''}`}>
              <div className="image-placeholder">
                <span className="room-icon">🏠</span>
              </div>
              <img 
                src={room.images?.[currentImageIndex] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={room.title}
                onLoad={() => setImageLoaded(true)}
                className="room-image"
              />
              <div className="image-overlay"></div>
            </div>
            
            {room.images && room.images.length > 1 && (
              <>
                <button className="nav-button prev-button" onClick={prevImage}>
                  ‹
                </button>
                <button className="nav-button next-button" onClick={nextImage}>
                  ›
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {room.images.length}
                </div>
              </>
            )}
          </div>

          {room.images && room.images.length > 1 && (
            <div className="gallery-thumbnails">
              {room.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Room Content */}
        <div className="room-content">
          <div className="room-header">
            <div>
              <h1 className="room-title">{room.title}</h1>
              <p className="room-location">
                <span className="location-icon">📍</span>
                {room.location}
              </p>
            </div>
            <div className="price-section">
              <div className="price-amount">₹{room.price}</div>
              <div className="price-period">/month</div>
            </div>
          </div>

          <div className="room-description">
            <p>{room.description}</p>
          </div>

          {/* Room Features */}
          <div className="room-features-grid">
            <div className="feature-item">
              <div className="feature-icon">👥</div>
              <div className="feature-content">
                <span className="feature-label">Gender Preference</span>
                <span className="feature-value">{room.genderPreference || "Any"}</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🚭</div>
              <div className="feature-content">
                <span className="feature-label">Smoking</span>
                <span className="feature-value">{room.smokingAllowed ? "Allowed" : "Not Allowed"}</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🍽️</div>
              <div className="feature-content">
                <span className="feature-label">Food Preference</span>
                <span className="feature-value">{room.foodPreference || "Not Specified"}</span>
              </div>
            </div>

            {room.size && (
              <div className="feature-item">
                <div className="feature-icon">📏</div>
                <div className="feature-content">
                  <span className="feature-label">Room Size</span>
                  <span className="feature-value">{room.size} sq ft</span>
                </div>
              </div>
            )}

            {room.furnishing && (
              <div className="feature-item">
                <div className="feature-icon">🛋️</div>
                <div className="feature-content">
                  <span className="feature-label">Furnishing</span>
                  <span className="feature-value">{room.furnishing}</span>
                </div>
              </div>
            )}

            {room.amenities && room.amenities.length > 0 && (
              <div className="feature-item full-width">
                <div className="feature-icon">✨</div>
                <div className="feature-content">
                  <span className="feature-label">Amenities</span>
                  <div className="amenities-list">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h3>Interested in this room?</h3>
            <div className="contact-buttons">
              <button className="contact-button primary">
                <span className="button-icon">📞</span>
                Contact Owner
              </button>
              <button className="contact-button secondary">
                <span className="button-icon">💬</span>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;