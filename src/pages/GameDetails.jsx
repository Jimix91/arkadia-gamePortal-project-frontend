import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { getGameById, deleteGame } from "../services/games.service"
import "../CSS/GameDetails.css"
import ReviewList from "../components/ReviewList"
import CreateReview from "../components/CreateReview"

function GameDetails() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useContext(AuthContext)
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchGame = async () => {
    try {
      setLoading(true)
      const data = await getGameById(gameId)
      setGame(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("No se pudieron cargar los detalles del juego.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGame()
  }, [gameId])

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Borrar este juego? Esta acción no se puede deshacer.")
    if (!confirmDelete) return

    try {
      const storedToken = localStorage.getItem("authToken")
      await deleteGame(gameId, storedToken)
      navigate("/games")
    } catch (err) {
      console.error(err)
      setError("No se pudo borrar el juego. Intenta de nuevo.")
    }
  }

  const handleReviewCreated = () => {
    setRefreshKey((prev) => prev + 1)
    fetchGame()
  }

  if (loading) {
    return (
      <div className="game-details-page">
        <div className="game-details">
          <p>Cargando juego...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="game-details-page">
        <div className="game-details">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!game) return null

  return (
    <div className="game-details-page">
      <div className="game-details">
        <div className="game-top">
          <div>
            <p className="eyebrow">Perfil del juego</p>
            <h3>{game.title}</h3>
            <div className="meta-row">
              {(game.platforms || []).map((plat) => (
                <NavLink
                  key={plat}
                  to={`/games?platform=${encodeURIComponent(plat)}`}
                  className="platform-link"
                >
                  <span className="badge">{plat}</span>
                </NavLink>
              ))}
              <span className="chip">{game.developer || "Desconocido"}</span>
              <span className="chip">{game.year || "Desconocido"}</span>
            </div>
          </div>

          <div className="rating-pill">
            {game.averageRating ? (
              <>
                <div className="rating-number">{game.averageRating.toFixed(1)}</div>
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
                <p className="rating-caption">Puntaje de la comunidad</p>
              </>
            ) : (
              <span className="no-rating">Sin valoraciones</span>
            )}
          </div>
        </div>

        {game.image && (
          <div className="image-frame">
            <img src={game.image} alt={game.title} />
            <div className="image-overlay" />
          </div>
        )}

        <div className="info-grid">
          <div>
            <p className="label">Desarrollador</p>
            <p className="value">{game.developer || "Desconocido"}</p>
          </div>
          <div>
            <p className="label">Año de lanzamiento</p>
            <p className="value">{game.year || "Desconocido"}</p>
          </div>
          <div>
            <p className="label">Plataformas</p>
            <p className="value value-wrap">{(game.platforms || []).join(", ")}</p>
          </div>
        </div>

        <div className="description-card">
          <h4>Descripción</h4>
          <p>{game.description || "Sin descripción disponible."}</p>
        </div>

        {isLoggedIn && user?.role === "admin" && (
          <div className="game-actions">
            <NavLink to={`/games/edit/${gameId}`}>
              <button className="edit-button">✏️ Editar juego</button>
            </NavLink>
            <button onClick={handleDelete} className="delete-button">
              🗑️ Borrar juego
            </button>
          </div>
        )}

        <div className="reviews-section">
          <CreateReview gameId={gameId} onReviewCreated={handleReviewCreated} />
          <ReviewList key={refreshKey} gameId={gameId} />
        </div>
      </div>
    </div>
  )
}

export default GameDetails