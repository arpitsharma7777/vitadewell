import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Import the CSS file

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [tiffins, setTiffins] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login"); // Redirect if not logged in
      return;
    }
    setUser(loggedInUser);

    // Fetch user's own listings
    fetchUserListings(loggedInUser.token);
  }, [navigate]);

  const fetchUserListings = async (token) => {
    try {
      const resRooms = await fetch("http://localhost:5000/api/rooms/my-listings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resTiffins = await fetch("http://localhost:5000/api/tiffin/my-listings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resBooks = await fetch("http://localhost:5000/api/books/my-listings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRooms(await resRooms.json());
      setTiffins(await resTiffins.json());
      setBooks(await resBooks.json());
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const endpoint = `http://localhost:5000/api/${type}/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        if (type === "rooms") setRooms(rooms.filter((room) => room._id !== id));
        if (type === "tiffin") setTiffins(tiffins.filter((tiffin) => tiffin._id !== id));
        if (type === "books") setBooks(books.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-header">
            <h2>{user.name || 'User'}'s Profile</h2>
            <p>Email: {user.email}</p>
          </div>

          <div className="manage-listings">
            <h3>Manage Listings</h3>
            <div className="listing-actions">
              <button className="action-btn" onClick={() => navigate("/add-room")}>
                <span>➕</span> Add Room
              </button>
              <button className="action-btn" onClick={() => navigate("/add-tiffin")}>
                <span>➕</span> Add Tiffin
              </button>
            </div>
          </div>

          <div className="listing-section">
            <h3>Your Rooms</h3>
            {rooms.length > 0 ? (
              <div className="listing-grid">
                {rooms.map((room) => (
                  <div key={room._id} className="listing-card">
                    <div className="listing-info">
                      <p>{room.title}</p>
                    </div>
                    <button className="delete-btn" onClick={() => handleDelete(room._id, "rooms")}>
                      <span>❌</span> Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No rooms added yet.</p>
            )}
          </div>

          <div className="listing-section">
            <h3>Your Tiffin Services</h3>
            {tiffins.length > 0 ? (
              <div className="listing-grid">
                {tiffins.map((tiffin) => (
                  <div key={tiffin._id} className="listing-card">
                    <div className="listing-info">
                      <p>{tiffin.name}</p>
                    </div>
                    <button className="delete-btn" onClick={() => handleDelete(tiffin._id, "tiffin")}>
                      <span>❌</span> Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">No tiffin services added yet.</p>
            )}
          </div>

          <button className="logout-btn" onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}>
            <span>🚪</span> Logout
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;