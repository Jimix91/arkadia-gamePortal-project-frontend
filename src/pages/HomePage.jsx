import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="hero-pill">Top picks</div>
        <h1 className="home-title">Arkadia Game Portal</h1>
        <p className="home-subtitle">Discover, rate, and track the best titles curated by the community.</p>
        <div className="home-actions">
          <a className="btn-primary" href="/games">Browse all games</a>
          <a className="btn-ghost" href="#top-rated">View top rated</a>
        </div>
      </header>

      <main id="top-rated" className="home-content">
        <div className="section-header">
          <div>
            <p className="eyebrow">4.5★ and above</p>
            <h2>Community favorites</h2>
          </div>
          <p className="section-hint">Updated live as reviews come in.</p>
        </div>
        <GameList minRating={4.5} />
      </main>
    </div>
  )
}

export default HomePage
