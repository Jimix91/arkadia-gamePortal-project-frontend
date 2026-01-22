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
          <h1>Browse Games</h1>
          {platform && (
            <span className="chip">Platform: {platform}</span>
          )}
        </div>
        <p className="filtered-subtitle">
          Click a platform badge to filter. Use "Clear" to see all platforms again.
        </p>
      </header>

      <main>
        <GameList />
      </main>
    </div>
  );
}

export default FilteredGamesPage;
