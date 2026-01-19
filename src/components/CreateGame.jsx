import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlatforms, createGame } from "../services/games.service";
import "../CSS/CreateGame.css"


function CreateGame() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [platformOptions, setPlatformOptions] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const platforms = await getPlatforms();
        setPlatformOptions(platforms);
      } catch (err) {
        console.error("Error fetching platforms", err);
      }
    };
    fetchPlatforms();
  }, []);

  
  const handlePlatformToggle = (plat) => {
    if (platforms.includes(plat)) {
      setPlatforms(platforms.filter((p) => p !== plat));
    } else {
      setPlatforms([...platforms, plat]);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newGame = { title, image, platforms, description };
    const storedToken = localStorage.getItem("authToken");

    createGame(newGame, storedToken)
      .then(() => navigate("/"))
      .catch((err) =>
        console.log("Something went wrong adding your game", err)
      );
  };

  return (
    <form onSubmit={handleSubmit} className="create-game-form">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g Super Mario"
        required
      />

      <label>Image</label>
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://....."
      />

      <label>Platforms</label>
      <div className="dropdown-container form-input">
        <div
          className="dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {platforms.length > 0 ? platforms.join(", ") : "Select platforms"}
          <span className="dropdown-arrow">▼</span>
        </div>

        {dropdownOpen && (
          <div className="dropdown-options">
            {platformOptions.map((plat) => (
              <div
                key={plat}
                onClick={() => handlePlatformToggle(plat)}
                className={`dropdown-option ${platforms.includes(plat) ? "selected" : ""
                  }`}
              >
                {plat} {platforms.includes(plat) ? "✔" : ""}
              </div>
            ))}
          </div>
        )}
      </div>

      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="This game is about...."
      />

      <button type="submit">Save Game</button>
    </form>
  );
}

export default CreateGame;
