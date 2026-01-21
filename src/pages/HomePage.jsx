import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div className="home">
      <h1 className="home-title">ARKADIA</h1>
      <GameList/>
    </div>
  )
}

export default HomePage