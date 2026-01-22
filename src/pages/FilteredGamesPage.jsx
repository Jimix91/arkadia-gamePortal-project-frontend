import { useSearchParams } from "react-router-dom";
import GameList from "../components/GameList";
import "../CSS/FilteredGamesPage.css";

function FilteredGamesPage() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform");

  return (
    <div className="filtered-games-page">
      <header className="filtered-header">
        <div className="filtered-title-row">
          <h1>Explorar juegos</h1>
          {platform && (
            <span className="chip">Plataforma: {platform}</span>
          )}
        </div>
        <p className="filtered-subtitle">
          Haz clic en una plataforma para filtrar. Usa "Limpiar" para ver todas las plataformas de nuevo.
        </p>
      </header>

      <main>
        <GameList />
      </main>
    </div>
  );
}

export default FilteredGamesPage;
