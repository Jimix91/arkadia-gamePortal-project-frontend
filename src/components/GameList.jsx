import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllGames } from "../services/games.service"
import "../CSS/GameList.css"

function GameList() {
  const [games, setGames] = useState([])

  useEffect(() => {
    getAllGames()
      .then((data) => setGames(data))
      .catch((err) => console.log("Something went wrong trying to get the Games List", err))
  }, [])

  return (
    <div className="game-list">
      {games.map((game) => (
        <div key={game._id} className="game-card">
          {game.image && <img src={game.image} alt={game.title} />}
          <div className="game-card-content">
            <h3>{game.title}</h3>
            <div>
              {game.platforms.map((plat) => (
                <span key={plat} className="badge">{plat}</span>
              ))}
            </div>
            <p className="rating">{game.averageRating ? `⭐ ${game.averageRating}` : "No ratings yet"}</p>
            <NavLink to={`/games/${game._id}`}>See Details</NavLink>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GameList
