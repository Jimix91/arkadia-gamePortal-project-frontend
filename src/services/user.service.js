import axios from "axios";
import { API_URL } from "../context/auth.context";

export const getMyProfile = async (token) => {
  const res = await axios.get(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addFavoriteGame = async (gameId, token) => {
  const res = await axios.post(
    `${API_URL}/api/users/favorites/${gameId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeFavoriteGame = async (gameId, token) => {
  const res = await axios.delete(`${API_URL}/api/users/favorites/${gameId}` , {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
