import "../CSS/AboutPage.css"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-header">
        <p className="eyebrow">Sobre Arkadia</p>
        <h1>Stack moderno para reseñas gamers</h1>
        <p className="subtitle">Aplicación fullstack creada como proyecto final del Bootcamp de Fullstack Web Development en Ironhack.</p>
        <p className="subtitle">Arkadia conecta jugadores, permite crear reseñas rápidas y descubrir títulos con filtros claros.</p>
        <div className="hero-actions">
          <a href="https://github.com/Jimix91" target="_blank" rel="noopener noreferrer" className="primary-btn">GitHub</a>
          <a href="https://www.linkedin.com/in/joan-jim%C3%A9nez-camps-4084a8226/" target="_blank" rel="noopener noreferrer" className="ghost-btn">LinkedIn</a>
        </div>
      </section>

      <section className="tech-grid">
        <div className="about-card">
          <p className="label">Frontend</p>
          <h4>React + Vite</h4>
          <p>Interfaz rápida con React Router, hooks y componentes modulares para listas, filtros y formularios.</p>
        </div>
        <div className="about-card">
          <p className="label">Backend</p>
          <h4>Node/Express</h4>
          <p>API que gestiona juegos y reseñas, validando roles para panel de administración y creación de contenido.</p>
        </div>
        <div className="about-card">
          <p className="label">Autenticación</p>
          <h4>JWT + Bcrypt</h4>
          <p>Inicio de sesión seguro, rutas privadas para crear juegos y reseñas, y gestión de sesión en el cliente.</p>
        </div>
        <div className="about-card">
          <p className="label">Datos</p>
          <h4>MongoDB</h4>
          <p>Modelos de juegos y reseñas conectados, con filtrado y ordenamiento para mostrar los títulos mejor valorados.</p>
        </div>
      </section>

      <section className="about-profile">
        <p className="eyebrow">Sobre el creador</p>
        <h2>Hola, soy Joan Jimenez Camps</h2>
        <p className="subtitle">Me apasiona crear experiencias útiles para comunidades gamers y seguir explorando tecnologías modernas.</p>
        <p className="subtitle">Si quieres hablar sobre el proyecto o colaborar, escríbeme en LinkedIn o revisa el repositorio en GitHub.</p>
        <div className="hero-actions">
          <a href="https://github.com/Jimix91" target="_blank" rel="noopener noreferrer" className="primary-btn">GitHub</a>
          <a href="https://www.linkedin.com/in/joan-jim%C3%A9nez-camps-4084a8226/" target="_blank" rel="noopener noreferrer" className="ghost-btn">LinkedIn</a>
        </div>
      </section>

      <section className="about-footer-cta">
        <div>
          <p className="eyebrow">Listo para jugar</p>
          <h2>Explora, puntúa y comparte</h2>
          <p className="subtitle">Descubre el catálogo o impulsa tu juego favorito en segundos.</p>
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