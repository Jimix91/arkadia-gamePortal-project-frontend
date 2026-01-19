import { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from "react-router-dom"
import { getGameById, deleteGame } from "../services/games.service"
import "../CSS/GameDetails.css"

function GameDetails() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(null)

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

  const isOwner = localStorage.getItem("authToken") 



  return (
    <div className="game-details">
      <h3>{game.title}</h3>

      {game.image && (
        <img src={game.image} alt={game.title} />
      )}

      <p><strong>Platforms:</strong> {game.platforms.map((element)=> <span key={element} className="badge">{element}</span>)}</p>
      <p><strong>Description:</strong> {game.description}</p>

      {isOwner && (
        <div className="game-actions">
          <NavLink to={`/games/edit/${gameId}`}><button className="edit-button">
            ✏️ Edit Game
          </button></NavLink>
          <button onClick={handleDelete} className="delete-button">
            🗑️ Delete Game
          </button>
        </div>
      )}
    </div>
  )

  
}

export default GameDetails