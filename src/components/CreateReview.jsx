import { useState, useContext } from "react"
import { createReview } from "../services/review.service"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"
import "../CSS/CreateReview.css"

function CreateReview({ gameId, onReviewCreated }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ content: "", rating: 5 })
  const [hoverRating, setHoverRating] = useState(0) // hover dinámico
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleStarClick = (star) => {
    setFormData({ ...formData, rating: star })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!formData.content.trim()) {
      setError("Por favor escribe una reseña")
      setLoading(false)
      return
    }

    const storedToken = localStorage.getItem("authToken")

    if (!storedToken) {
      setError("Necesitas iniciar sesión para crear una reseña")
      setLoading(false)
      return
    }

    createReview(gameId, formData, storedToken)
      .then(() => {
        setFormData({ content: "", rating: 5 })
        setHoverRating(0)
        setShowForm(false)
        onReviewCreated()
      })
      .catch((err) => {
        console.error("Error creating review", err)
        setError("No se pudo crear la reseña. Intenta de nuevo.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({ content: "", rating: 5 })
    setHoverRating(0)
    setError(null)
  }

  if (!user) {
    return (
      <Link to="/login">
        <button className="create-review-button">⭐ Crear reseña</button>
      </Link>
    )
  }

  return (
    <div className="create-review-container">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="create-review-button"
        >
          ⭐ Crear reseña
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="review-form">
          <h4>Escribe tu reseña</h4>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="content">Tu reseña:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Comparte tus impresiones sobre este juego..."
              minLength={10}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Puntuación:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || formData.rating) ? "filled" : ""}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
              <span className="rating-number">{formData.rating} / 5</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Publicando..." : "Publicar reseña"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateReview
