import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">Arkadia | Donde los Juegos se Reseñan</h1>
        <p className="home-subtitle">Descubre, puntúa y sigue los mejores títulos curados por la comunidad.</p>
        <div className="home-actions">
          <a className="btn-primary" href="/games">Ver todos los juegos</a>
        </div>
      </header>

      <main id="top-rated" className="home-content">
        <div className="section-header">
          <div>
            <p className="eyebrow">4.5★ o más</p>
            <h2>Favoritos de la comunidad</h2>
          </div>
          <p className="section-hint">Actualizado en vivo según llegan reseñas.</p>
        </div>
        <GameList minRating={4.5} />
      </main>
    </div>
  )
}

export default HomePage
