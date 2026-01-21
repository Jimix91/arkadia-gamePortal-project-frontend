import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, updateGame, getPlatforms } from "../services/games.service";
import "../CSS/EditGame.css";

function EditGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    getGameById(gameId)
      .then((game) => {
        setTitle(game.title || "");
        setImage(game.image || "");
        setDescription(game.description || "");
        setPlatforms(game.platforms || []);
      })
      .catch((err) => console.error(err));
  }, [gameId]);

  useEffect(() => {
    getPlatforms()
      .then((platforms) => setPlatformOptions(platforms))
      .catch((err) => console.error(err));
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

    const updatedGame = { title, image, description, platforms };
    const storedToken = localStorage.getItem("authToken");

    updateGame(gameId, updatedGame, storedToken)
      .then(() => {
        navigate(`/games/${gameId}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-game">
      <h1 className="edit-game-title">Edit Game</h1>

      <form className="edit-game-form" onSubmit={handleSubmit}>
        <label className="edit-form-label">Title</label>
        <input
          className="edit-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Game title"
        />

        <label className="edit-form-label">Image URL</label>
        <input
          className="edit-form-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />

        <label className="edit-form-label">Description</label>
        <textarea
          className="edit-form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label className="edit-form-label">Platforms</label>
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
                  className={`dropdown-option ${platforms.includes(plat) ? "selected" : ""}`}
                >
                  {plat} {platforms.includes(plat) ? "✔" : ""}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="edit-game-actions">
          <button className="edit-form-button" type="submit">
            💾 Save changes
          </button>

          <button
            className="edit-form-button cancel"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGame;