import axios from "axios";
import { API_URL } from "../context/auth.context";

export const getPlatforms = async () => {
  const platforms = ["PC", "PS5", "PS4", "XBOX", "Switch"];
  return platforms;
};

export const getAllGames = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/games`);
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
    const res = await axios.post(`${API_URL}/api/games`, gameData, {
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
    const res = await axios.put(`${API_URL}/api/games/${gameId}`, gameData, {
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
