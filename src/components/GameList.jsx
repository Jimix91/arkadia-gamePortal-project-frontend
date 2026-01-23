import { useContext, useEffect, useState } from "react"
import { NavLink, useSearchParams, useNavigate } from "react-router-dom"
import { getAllGames } from "../services/games.service"
import { AuthContext } from "../context/auth.context"
import "../CSS/GameList.css"

function GameList({ minRating = 0 }) {
  const [games, setGames] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const platformFilter = searchParams.get("platform") || ""
  const searchQuery = searchParams.get("search") || ""
  const { isLoggedIn, favorites, toggleFavorite } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllGames(platformFilter)
      .then((data) => {
        let filtered = minRating
          ? data.filter((g) => (g.averageRating || 0) >= minRating)
          : data
        
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter((g) => {
            const titleMatch = g.title.toLowerCase().includes(query);
            const developerMatch = (g.developer || "").toLowerCase().includes(query);
            const yearMatch = (g.year || "").toString().includes(query);
            const platformMatch = (g.platforms || []).some((p) =>
              p.toLowerCase().includes(query)
            );
            
            return titleMatch || developerMatch || yearMatch || platformMatch;
          });
        }
        
        setGames(filtered)
      })
      .catch((err) => console.log("Error obteniendo la lista de juegos", err))
  }, [platformFilter, minRating, searchQuery])

  const clearFilter = () => {
    setSearchParams({})
  }

  const handleFavoriteClick = async (gameId, event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    await toggleFavorite(gameId)
  }

  return (
    <div className="game-list">
      {(platformFilter || searchQuery) && (
        <div className="active-filter">
          <span>
            {platformFilter && `Filtrado por plataforma: ${platformFilter}`}
            {platformFilter && searchQuery && " • "}
            {searchQuery && `Búsqueda: "${searchQuery}"`}
          </span>
          <button onClick={clearFilter} className="clear-filter">Limpiar</button>
        </div>
      )}
      {games.map((game) => (
        <div key={game._id} className="game-card">
          <button
            className={`favorite-btn ${favorites.includes(game._id) ? "is-active" : ""}`}
            onClick={(event) => handleFavoriteClick(game._id, event)}
            aria-label={favorites.includes(game._id) ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {favorites.includes(game._id) ? "♥" : "♡"}
          </button>
          {game.image && <img src={game.image} alt={game.title} />}
          <div className="game-card-content">
            <h3>{game.title}</h3>
            <div>
              {game.platforms.map((plat) => (
                <NavLink
                  key={plat}
                  to={`/games?platform=${encodeURIComponent(plat)}`}
                  className="platform-link"
                >
                  <span className="badge">{plat}</span>
                </NavLink>
              ))}
            </div>
            <div className="rating">
              {game.averageRating ? (
                <>
                  <span className="rating-number">
                    {game.averageRating.toFixed(1)}
                  </span>

                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= Math.round(game.averageRating)
                            ? "star filled"
                            : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <span className="no-rating">Sin valoraciones</span>
              )}
            </div>
            <NavLink to={`/games/${game._id}`} className="details-link">Ver detalles</NavLink>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameList
