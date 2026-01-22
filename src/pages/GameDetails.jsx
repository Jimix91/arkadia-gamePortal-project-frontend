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
  const { isLoggedIn } = useContext(AuthContext)
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
      setError("Unable to load game details.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGame()
  }, [gameId])

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this game? This action cannot be undone.")
    if (!confirmDelete) return

    try {
      const storedToken = localStorage.getItem("authToken")
      await deleteGame(gameId, storedToken)
      navigate("/games")
    } catch (err) {
      console.error(err)
      setError("Could not delete the game. Please try again.")
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
          <p>Loading game...</p>
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
            <p className="eyebrow">Game profile</p>
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
              <span className="chip">{game.developer || "Unknown"}</span>
              <span className="chip">{game.year || "Unknown"}</span>
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
                <p className="rating-caption">Community score</p>
              </>
            ) : (
              <span className="no-rating">No ratings yet</span>
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
            <p className="label">Developer</p>
            <p className="value">{game.developer || "Unknown"}</p>
          </div>
          <div>
            <p className="label">Release year</p>
            <p className="value">{game.year || "Unknown"}</p>
          </div>
          <div>
            <p className="label">Platforms</p>
            <p className="value value-wrap">{(game.platforms || []).join(", ")}</p>
          </div>
        </div>

        <div className="description-card">
          <h4>Overview</h4>
          <p>{game.description || "No description available."}</p>
        </div>

        {isLoggedIn && (
          <div className="game-actions">
            <NavLink to={`/games/edit/${gameId}`}>
              <button className="edit-button">✏️ Edit Game</button>
            </NavLink>
            <button onClick={handleDelete} className="delete-button">
              🗑️ Delete Game
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