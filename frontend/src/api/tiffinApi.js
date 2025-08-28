import apiClient from "./apiClient";

export const fetchTiffins = async () => {
  try {
    const response = await apiClient.get("/tiffins");
    return response.data;
  } catch (error) {
    console.error("Error fetching tiffin services:", error);
    throw error;
  }
};

export const fetchTiffinById = async (id) => {
  try {
    const response = await apiClient.get(`/tiffins/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tiffin by ID:", error);
    throw error;
  }
};
