import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRooms } from "../api/roomApi";
import "./FindRooms.css";

// SVG Icons (you can replace these with actual SVG imports or icon library)
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PriceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GenderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SmokingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

const FindRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [smokingAllowed, setSmokingAllowed] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  const loadRooms = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (location) queryParams.append("location", location);
      if (minPrice) queryParams.append("minPrice", minPrice);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);
      if (genderPreference) queryParams.append("genderPreference", genderPreference);
      if (smokingAllowed) queryParams.append("smokingAllowed", smokingAllowed);

      const data = await fetchRooms(`?${queryParams}`);
      setRooms(data);
    } catch (error) {
      console.error("Failed to load rooms:", error);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [search, location, minPrice, maxPrice, genderPreference, smokingAllowed]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const getSortedRooms = () => {
    const sortedRooms = [...rooms];
    if (sortBy === "priceLowToHigh") {
      return sortedRooms.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceHighToLow") {
      return sortedRooms.sort((a, b) => b.price - a.price);
    }
    return sortedRooms;
  };

  return (
    <div className="find-rooms-container">
      <div className="find-rooms-header">
        <h2>Find Your Ideal Room</h2>
        <p>Discover the perfect place that feels like home</p>
      </div>

      {/* Search and Filters */}
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                className="filter-input"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="filter-input"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Gender Preference</label>
            <select 
              className="filter-select"
              value={genderPreference} 
              onChange={(e) => setGenderPreference(e.target.value)}
            >
              <option value="">Any Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Smoking Allowed</label>
            <select 
              className="filter-select"
              value={smokingAllowed} 
              onChange={(e) => setSmokingAllowed(e.target.value)}
            >
              <option value="">Any</option>
              <option value="true">Allowed</option>
              <option value="false">Not Allowed</option>
            </select>
          </div>
        </div>

        <div className="sort-container">
          <span className="sort-label">Sort by:</span>
          <select 
            className="filter-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Recommended</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Room Listings */}
      {loading ? (
        <p className="loading-text">Loading rooms...</p>
      ) : (
        <div className="rooms-grid">
          {getSortedRooms().length === 0 ? (
            <div className="no-rooms">
              <p>No rooms found matching your criteria</p>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            getSortedRooms().map((room) => (
              <div 
                key={room._id} 
                className="room-card"
                onClick={() => navigate(`/rooms/${room._id}`)}
              >
                <div className="room-image">
                  {room.image ? (
                    <img src={room.image} alt={room.title} />
                  ) : (
                    <span>Room Image</span>
                  )}
                </div>
                
                <div className="room-content">
                  <h3 className="room-title">{room.title}</h3>
                  
                  <div className="room-details">
                    <div className="room-detail">
                      <LocationIcon />
                      <span>{room.location}</span>
                    </div>
                    
                    <div className="room-detail">
                      <PriceIcon />
                      <span className="room-price">₹{room.price}/month</span>
                    </div>
                    
                    <div className="room-detail">
                      <GenderIcon />
                      <span>Gender Preference: {room.genderPreference || "Any"}</span>
                    </div>
                    
                    <div className="room-detail">
                      <SmokingIcon />
                      <span>Smoking: {room.smokingAllowed ? "Allowed" : "Not Allowed"}</span>
                    </div>
                  </div>
                  
                  <div className="room-tags">
                    <span className="room-tag tag-gender">{room.genderPreference || "Any Gender"}</span>
                    <span className="room-tag tag-smoking">
                      {room.smokingAllowed ? "Smoking Allowed" : "No Smoking"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FindRooms;