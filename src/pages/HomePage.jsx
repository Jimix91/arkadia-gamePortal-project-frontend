import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <p className="home-intro">
          Game Portal - Discover and review your favorite games!
        </p>
        <hr className="home-separator" />
      </header>

      <main>
        <GameList />
      </main>
    </div>
  )
}

export default HomePage
