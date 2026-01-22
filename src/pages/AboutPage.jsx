import "../CSS/AboutPage.css"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__text">
          <p className="eyebrow">Arkadia</p>
          <h1>Donde los gamers comparten sus mundos</h1>
          <p className="subtitle">
            Explora reseñas honestas, descubre gemas ocultas y guarda tus favoritos con una comunidad que ama tanto jugar como crear.
          </p>
          <div className="hero-actions">
            <Link to="/games" className="primary-btn">Ver juegos</Link>
            <Link to="/games/create" className="ghost-btn">Añadir un juego</Link>
          </div>
        </div>
        <div className="about-hero__card">
          <h3>Tu hub de descubrimiento</h3>
          <ul>
            <li>Filtra por plataforma y ordena por las mejores valoraciones.</li>
            <li>Crea reseñas rápidas para compartir tu experiencia.</li>
            <li>Perfila tus juegos con imágenes, año y desarrollador.</li>
          </ul>
        </div>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <p className="label">Comunidad</p>
          <h4>Reseñas centradas en jugadores</h4>
          <p>Opiniones reales con puntuaciones claras y estrellas, para que sepas en segundos si un juego merece tu tiempo.</p>
        </div>
        <div className="about-card">
          <p className="label">Descubrimiento</p>
          <h4>Curación inteligente</h4>
          <p>Sección de destacados con los títulos mejor valorados y un buscador filtrable por plataforma.</p>
        </div>
        <div className="about-card">
          <p className="label">Creadores</p>
          <h4>Sube tus propios títulos</h4>
          <p>Formulario guiado para agregar juegos con portada, descripción y soporte multi-plataforma.</p>
        </div>
        <div className="about-card">
          <p className="label">Tecnología</p>
          <h4>Stack moderno</h4>
          <p>Frontend en React + Vite, backend Node/Express y autenticación JWT para una experiencia fluida.</p>
        </div>
      </section>

      <section className="about-profile">
        <div>
          <p className="eyebrow">Sobre el creador</p>
          <h2>Hola, soy Joan Jimenez Camps</h2>
          <p className="subtitle">Construí Arkadia como proyecto final del Bootcamp de Fullstack Web Development en Ironhack.</p>
          <p className="subtitle">Me apasiona crear experiencias digitales útiles para comunidades gamers y seguir aprendiendo tecnologías modernas.</p>
          <div className="hero-actions">
            <a href="https://github.com/Jimix91" target="_blank" rel="noopener noreferrer" className="primary-btn">GitHub</a>
            <a href="https://www.linkedin.com/in/joan-jim%C3%A9nez-camps-4084a8226/" target="_blank" rel="noopener noreferrer" className="ghost-btn">LinkedIn</a>
          </div>
        </div>
      </section>

      <section className="about-footer-cta">
        <div>
          <p className="eyebrow">Listo para jugar</p>
          <h2>Explora, puntúa y comparte</h2>
          <p className="subtitle">Sumérgete en el catálogo o impulsa tu juego favorito en segundos.</p>
        </div>
        <div className="hero-actions">
          <Link to="/games" className="primary-btn">Explorar ahora</Link>
          <Link to="/signup" className="ghost-btn">Crear cuenta</Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage