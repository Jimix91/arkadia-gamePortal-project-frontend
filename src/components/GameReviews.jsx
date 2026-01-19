import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllGames } from "../services/games.service"

function GameList() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getAllReviews()
      .then((data) => {
        setReviews(data)
      })
      .catch((err) => {
        console.log("Something went wrong trying to get the Reviews List", err)
      })
  }, [])

  return (
    <>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.content}</h3>

          <h3>{review.rating}</h3>
          
          <p>{review.platforms.map((element)=> <span key={element} className="badge">{element}</span>)}</p>

          <NavLink to={`/games/${game._id}`}>
            See Details
          </NavLink>
        </div>
      ))}
    </>
  )
}

export default GameList
