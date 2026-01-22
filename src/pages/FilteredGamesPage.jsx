import { useSearchParams } from "react-router-dom";
import GameList from "../components/GameList";
import "../CSS/FilteredGamesPage.css";

function FilteredGamesPage() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");
  const search = searchParams.get("search");
  const hasFilters = platform || search;

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
      </header>

      <main>
        <GameList />
      </main>
    </div>
  );
}

export default FilteredGamesPage;
