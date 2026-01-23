import "../CSS/NotFoundPage.css"
import { Link } from "react-router-dom"

function NotfoundPage() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="eyebrow">404</p>
        <h1>Uncharted territory</h1>
        <p className="notfound-copy">We couldn't find this screen, but the portal remains open to discover games.</p>
        <div className="notfound-actions">
          <Link to="/" className="primary-btn">Back to home</Link>
          <Link to="/games" className="ghost-btn">View games</Link>
        </div>
      </div>
    </div>
  )
}

export default NotfoundPage