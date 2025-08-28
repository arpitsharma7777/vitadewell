export const createRoom = async (roomData) => {
  try {
    const response = await apiClient.post("/rooms", roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

import apiClient from "./apiClient";

export const fetchRooms = async (queryParams = "") => {
  try {
    const response = await apiClient.get(`/rooms${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const fetchRoomById = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    throw error;
  }
};
