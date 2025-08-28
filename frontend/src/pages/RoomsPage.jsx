import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RoomsPage.css";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/rooms?search=${initialSearch}`);
        if (Array.isArray(data.rooms)) {
          setRooms(data.rooms);
          setFilteredRooms(data.rooms);
        } else {
          setRooms([]);
          setFilteredRooms([]);
        }
      } catch (error) {
        console.error("Error fetching rooms", error);
        setRooms([]);
        setFilteredRooms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [initialSearch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = rooms.filter(room =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  }, [searchTerm, rooms]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/rooms?search=${searchTerm}`);
  };

  const handleRoomClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    navigate('/rooms');
  };

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1 className="rooms-title">
          <span className="title-icon">🏠</span>
          Find Your Perfect Room
        </h1>
        <p className="rooms-subtitle">Discover comfortable and affordable rooms near you</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title, location, or amenities..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button type="button" onClick={clearSearch} className="clear-search">
              ✕
            </button>
          )}
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Finding the best rooms for you...</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>No rooms found</h3>
          <p>{searchTerm ? `No results for "${searchTerm}". Try a different search.` : 'No rooms available at the moment.'}</p>
          {searchTerm && (
            <button onClick={clearSearch} className="clear-filter-button">
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="results-info">
            <span className="results-count">{filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found</span>
            {searchTerm && (
              <span className="search-term">for "{searchTerm}"</span>
            )}
          </div>
          
          <div className="room-grid">
            {filteredRooms.map((room, index) => (
              <div
                key={room._id}
                className="room-card"
                onClick={() => handleRoomClick(room._id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image">
                  <div className="image-placeholder">
                    <span className="room-icon">🏠</span>
                  </div>
                  <div className="price-badge">${room.price}/month</div>
                  {room.isFeatured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>
                
                <div className="card-content">
                  <h3 className="room-title">{room.title}</h3>
                  <p className="room-location">
                    <span className="location-icon">📍</span>
                    {room.location}
                  </p>
                  
                  <div className="room-features">
                    {room.amenities && room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="feature-tag">{amenity}</span>
                    ))}
                    {room.amenities && room.amenities.length > 3 && (
                      <span className="feature-tag">+{room.amenities.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className="room-meta">
                    {room.size && (
                      <div className="meta-item">
                        <span className="meta-icon">📏</span>
                        <span>{room.size} sq ft</span>
                      </div>
                    )}
                    {room.bedrooms && (
                      <div className="meta-item">
                        <span className="meta-icon">🛏️</span>
                        <span>{room.bedrooms} bed{room.bedrooms !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="view-details">
                    View Details <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomsPage;