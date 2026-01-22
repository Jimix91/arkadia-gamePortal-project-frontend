import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import GameList from "../components/GameList"
import "../CSS/HomePage.css"

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  return (
    <div className="home-page">
      <header className="home-hero">
        <div className="hero-main">
          <p className="eyebrow">Arkadia</p>
          <h1 className="home-title">Donde los gamers comparten sus mundos</h1>
          <p className="home-subtitle">Explora reseñas honestas, descubre gemas ocultas y guarda tus favoritos con una comunidad que ama tanto jugar como crear.</p>
          <div className="home-actions">
            <Link className="btn-primary" to="/games">Ver juegos</Link>
          </div>
          <div className="hero-pills">
            <span className="pill">Comunidad curada</span>
            <span className="pill">Reseñas en vivo</span>
            <span className="pill">Multi-plataforma</span>
          </div>
        </div>

        <div className="hero-panel">
          <form className="search-card" onSubmit={handleSearch}>
            <p className="eyebrow">Buscar juegos</p>
            <div className="search-inline">
              <input
                type="text"
                placeholder="Busca por título o género"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="home-search-input"
              />
              <button type="submit" className="home-search-btn">Buscar</button>
            </div>
            <p className="search-hint">Filtra por título, género o plataforma. Resultados en vivo al cargar la lista.</p>
          </form>

          <div className="discovery-card">
            <h3>Tu hub de descubrimiento</h3>
            <ul>
              <li>Filtra por plataforma y ordena por las mejores valoraciones.</li>
              <li>Crea reseñas rápidas para compartir tu experiencia.</li>
              <li>Perfila tus juegos con imágenes, año y desarrollador.</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="home-grid">
        <div className="home-card">
          <p className="label">Comunidad</p>
          <h4>Reseñas centradas en jugadores</h4>
          <p>Opiniones reales con puntuaciones claras para saber en segundos si un juego merece tu tiempo.</p>
        </div>
        <div className="home-card">
          <p className="label">Descubrimiento</p>
          <h4>Curación inteligente</h4>
          <p>Destacados con los títulos mejor valorados y búsqueda filtrable por plataforma.</p>
        </div>
        <div className="home-card">
          <p className="label">Creadores</p>
          <h4>Sube tus propios títulos</h4>
          <p>Formulario guiado para agregar juegos con portada, descripción y soporte multi-plataforma.</p>
        </div>
        <div className="home-card">
          <p className="label">Tecnología</p>
          <h4>Stack moderno</h4>
          <p>Frontend en React + Vite, backend Node/Express y autenticación JWT para una experiencia fluida.</p>
        </div>
      </section>

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
