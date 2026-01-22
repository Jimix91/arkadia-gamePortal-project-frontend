import "../CSS/NotFoundPage.css"
import { Link } from "react-router-dom"

function NotfoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="eyebrow">404</p>
        <h1>Zona no explorada</h1>
        <p className="notfound-copy">No encontramos esta pantalla, pero el portal sigue abierto para descubrir juegos.</p>
        <div className="notfound-actions">
          <Link to="/" className="primary-btn">Volver al inicio</Link>
          <Link to="/games" className="ghost-btn">Ver juegos</Link>
        </div>
      </div>
    </div>
  )
}

export default NotfoundPage