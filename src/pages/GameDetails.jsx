import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../context/auth.context"
import { useParams } from "react-router-dom"

function GameDetails() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    axios
      .get(`${API_URL}/api/games/${gameId}`)
      .then((response) => {
        setGame(response.data)
      })
      .catch((err) => {
        console.log("Something went wrong trying to get the Game Details", err)
        setLoading(true)
      })
  }, [gameId])

  if (!loading) {
    return <p>Game not found</p>
  }

  if (!game) {
    return <p>Loading game...</p>
  }

  return (
    <div>
      <h3>{game.title}</h3>

      {game.image && (
        <img src={game.image} alt={game.title} />
      )}

      <p><strong>Platforms:</strong> {game.platforms}</p>
      <p><strong>Description:</strong> {game.description}</p>
    </div>
  )
}

export default GameDetails