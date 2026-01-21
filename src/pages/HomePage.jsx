import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h2 className="home-intro">
          GAME PORTAL  
        </h2>
        <p className="home-intro">Discover and review your favorite games!</p>
        <hr className="home-separator" />
      </header>

      <main>
        <GameList />
      </main>
    </div>
  )
}

export default HomePage
