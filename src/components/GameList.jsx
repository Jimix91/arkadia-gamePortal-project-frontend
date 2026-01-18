import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../context/auth.context"
import { NavLink } from "react-router-dom"

function GameList() {
  const [games, setGames] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/games`)
      .then((response) => {
        setGames(response.data)
      })
      .catch((err) => {
        console.log("Something went wrong trying to get the Games List", err)
      })
  }, [])

  return (
    <>
      {games.map((game) => (
        <div key={game._id}>
          <h3>{game.title}</h3>

          {game.image && (
            <img src={game.image} alt={game.title} />
          )}

          <p>{game.platforms}</p>

          <NavLink to={`/api/games/${game._id}`}>
            See Details
          </NavLink>
        </div>
      ))}
    </>
  )
}

export default GameList
