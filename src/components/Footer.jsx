import { Link } from "react-router-dom"
import "../CSS/Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <p className="eyebrow">Arkadia</p>
          <h4>Gaming hub para descubrir, valorar y compartir.</h4>
          <p className="footer__meta">React + Vite · Node/Express · JWT</p>
        </div>

        <div className="footer__links">
          <Link to="/about">About</Link>
          <Link to="/games">Games</Link>
          <Link to="/games/create">Crear juego</Link>
          <Link to="/signup">Unirse</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Arkadia. All rights reserved.</span>
        <span className="footer__tag">Hecho con pasión gamer.</span>
      </div>
    </footer>
  )
}

export default Footer