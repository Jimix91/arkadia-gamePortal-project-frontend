import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import GameList from "../components/GameList";
import "../CSS/FilteredGamesPage.css";

function FilteredGamesPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const platform = searchParams.get("platform");
  const search = searchParams.get("search");
  const hasFilters = platform || search;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="filtered-games-page">
      <header className="filtered-header">
        <div className="filtered-title-row">
          <h1>Explorar juegos</h1>
          {platform && (
            <span className="chip">Plataforma: {platform}</span>
          )}
          {search && (
            <span className="chip">Búsqueda: "{search}"</span>
          )}
        </div>
        <p className="filtered-subtitle">
          {hasFilters
            ? "Usa \"Limpiar\" para ver todos los juegos de nuevo."
            : "Busca un juego, haz clic en una plataforma o explora toda la colección."}
        </p>
        
        <form className="filtered-search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar juegos por título o género"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filtered-search-input"
          />
          <button type="submit" className="filtered-search-btn">Buscar</button>
        </form>
      </header>

      <main>
        <GameList />
      </main>
    </div>
  );
}

export default FilteredGamesPage;
