import axios from "axios";
import { API_URL } from "../context/auth.context";



export const getReviewsByGameId = async (gameId) => {
  try {
    const res = await axios.get(`${API_URL}/api/reviews/game/${gameId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching reviews for game", err);
    return [];
  }
};

export const deleteReview = async (reviewId, token) => {
  try {
    const res = await axios.delete(
      `${API_URL}/api/reviews/${reviewId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error deleting review", err);
    throw err;
  }
};

export const updateReview = async (reviewId, reviewData, token) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/reviews/${reviewId}`,
      reviewData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error updating review", err);
    throw err;
  }
};

export const createReview = async (gameId, reviewData, token) => {
  try {
    const payload = { ...reviewData };
    console.log("Creating review with payload:", payload);
    const res = await axios.post(
      `${API_URL}/api/reviews/game/${gameId}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating review", err);
    throw err;
  }
};