
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await apiClient.get("/rooms");
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>🏡 Find Your Ideal Room</h1>
      <div>
        {rooms.map((room) => (
          <div key={room._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
            <h2>{room.title}</h2>
            <p>📍 Location: {room.location}</p>
            <p>💰 Price: ₹{room.price}</p>
            <p>{room.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
