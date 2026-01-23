import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getMyProfile,
  addFavoriteGame,
  removeFavoriteGame,
} from "../services/user.service";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }  
    
  const fetchProfile = async (token) => {
    const safeToken = token || localStorage.getItem("authToken");
    if (!safeToken) {
      setProfile(null);
      setFavorites([]);
      return;
    }

    try {
      const profileData = await getMyProfile(safeToken);
      setProfile(profileData);
      setFavorites((profileData.favorites || []).map((game) => game._id));
    } catch (err) {
      console.error("Error loading profile", err);
      setProfile(null);
      setFavorites([]);
    }
  };

  const authenticateUser = async () => { 
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setIsLoggedIn(false);
      setUser(null);
      setProfile(null);
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/auth/verify`,
        { headers: { Authorization: `Bearer ${storedToken}`} }
      );

      setIsLoggedIn(true);
      setUser(response.data);
      await fetchProfile(storedToken);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      setProfile(null);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }    
  
  const logOutUser = () => {
    removeToken();
    setProfile(null);
    setFavorites([]);
    authenticateUser();
  }    

  const toggleFavorite = async (gameId) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      return { success: false, reason: "auth" };
    }

    const isFavorite = favorites.includes(gameId);

    try {
      if (isFavorite) {
        await removeFavoriteGame(gameId, storedToken);
      } else {
        await addFavoriteGame(gameId, storedToken);
      }

      await fetchProfile(storedToken);
      return { success: true };
    } catch (err) {
      console.error("Error toggling favorite", err);
      return { success: false, reason: "server" };
    }
  };


  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        profile,
        favorites,
        storeToken,
        authenticateUser,
        logOutUser,
        fetchProfile,
        toggleFavorite,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext, API_URL };