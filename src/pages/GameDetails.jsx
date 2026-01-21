import { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { getGameById, deleteGame } from "../services/games.service"
import "../index.css"
import ReviewList from "../components/ReviewList"
import CreateReview from "../components/CreateReview"

function GameDetails() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    getGameById(gameId)
      .then((data) => {
        setGame(data)
      })
      .catch((err) => {
        console.log("Something went wrong trying to get the Game Details", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [gameId])


  if (loading) {
    return <p>Loading game...</p>
  }

  if (!game) {
    return <p>Game not found</p>
  }


  const handleDelete = () => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      console.log("You need to be logged in to delete a game")
      return
    }

    if (window.confirm("Are you sure you want to delete this game?")) {
      deleteGame(gameId, storedToken)
        .then(() => {
          navigate("/")
        })
        .catch((err) => {
          console.log("Something went wrong deleting the game", err)
        })
    }
  }

  const isLoggedIn = !!user

  const handleReviewCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="game-details">
      <h3>{game.title}</h3>

      {game.image && (
        <img src={game.image} alt={game.title} />
      )}

      <p><strong>Platforms:</strong> {game.platforms.map((element)=> <span key={element} className="badge">{element}</span>)}</p>
      <p><strong>Description:</strong> {game.description}</p>

      {isLoggedIn && (
        <div className="game-actions">
          <NavLink to={`/games/edit/${gameId}`}><button className="edit-button">
            ✏️ Edit Game
          </button></NavLink>
          <button onClick={handleDelete} className="delete-button">
            🗑️ Delete Game
          </button>
        </div>
      )}

      <div className="reviews-section">
        <h4>Reviews</h4>
        <CreateReview gameId={gameId} onReviewCreated={handleReviewCreated} />

        <ReviewList key={refreshKey} gameId={gameId} />
      </div>

    </div>

    
  )

  
}

export default GameDetails