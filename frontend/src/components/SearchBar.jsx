import { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for rooms, tiffin services, or books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <span className="search-icon">🔍</span>
        </button>
      </div>
      <div className="search-filters">
        <label className="filter-option">
          <input type="checkbox" name="filter" value="rooms" /> Rooms
        </label>
        <label className="filter-option">
          <input type="checkbox" name="filter" value="tiffin" /> Tiffin
        </label>
      </div>
    </form>
  );
};

export default SearchBar;