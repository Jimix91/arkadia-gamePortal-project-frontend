import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlatforms, createGame } from "../services/games.service";
import "../CSS/CreateGame.css"


function CreateGame() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
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
        console.error("Error obteniendo plataformas", err);
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

    const newGame = { title, imageFile, platforms, description };
    const storedToken = localStorage.getItem("authToken");

    createGame(newGame, storedToken)
      .then(() => navigate("/"))
      .catch((err) =>
        console.log("Algo salió mal al añadir tu juego", err)
      );
  };

  return (
    <form onSubmit={handleSubmit} className="create-game-form">
      <label>Título</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Por ejemplo, Super Mario"
        required
      />

      <label>Imagen</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <label>Plataformas</label>
      <div className="dropdown-container form-input">
        <div
          className="dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {platforms.length > 0 ? platforms.join(", ") : "Selecciona plataformas"}
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

      <label>Descripción</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Este juego trata sobre..."
      />

      <button type="submit">Guardar juego</button>
    </form>
  );
}

export default CreateGame;
