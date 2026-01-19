import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllGames } from "../services/games.service"

function GameList() {
  const [games, setGames] = useState([])

  useEffect(() => {
    getAllGames()
      .then((data) => {
        setGames(data)
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

          <p>{game.platforms.map((element)=> <span key={element} className="badge">{element}</span>)}</p>

          <NavLink to={`/games/${game._id}`}>
            See Details
          </NavLink>
        </div>
      ))}
    </>
  )
}

export default GameList
