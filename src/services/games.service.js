import axios from "axios";
import { API_URL } from "../context/auth.context";

export const getPlatforms = async () => {
  const platforms = ["PC", "PS5", "PS4", "XBOX", "Switch"];
  return platforms;
};

export const getAllGames = async (platform) => {
  try {
    const query = platform ? `?platform=${encodeURIComponent(platform)}` : "";
    const res = await axios.get(`${API_URL}/api/games${query}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching games", err);
    return [];
  }
};

export const getGameById = async (gameId) => {
  try {
    const res = await axios.get(`${API_URL}/api/games/${gameId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching game details", err);
    throw err;
  }
};

export const createGame = async (gameData, token) => {
  try {
    const formData = new FormData();
    formData.append("title", gameData.title);
    formData.append("description", gameData.description || "");
    formData.append("platforms", JSON.stringify(gameData.platforms || []));

    if (gameData.imageFile) {
      formData.append("image", gameData.imageFile);
    }

    const res = await axios.post(`${API_URL}/api/games`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating game", err);
    throw err;
  }
};

export const updateGame = async (gameId, gameData, token) => {
  try {
    const formData = new FormData();
    formData.append("title", gameData.title);
    formData.append("description", gameData.description || "");
    formData.append("platforms", JSON.stringify(gameData.platforms || []));

    if (gameData.imageFile) {
      formData.append("image", gameData.imageFile);
    } else if (gameData.image) {
      formData.append("image", gameData.image);
    }

    const res = await axios.put(`${API_URL}/api/games/${gameId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating game", err);
    throw err;
  }
};

export const deleteGame = async (gameId, token) => {
  try {
    const res = await axios.delete(`${API_URL}/api/games/${gameId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting game", err);
    throw err;
  }
};
