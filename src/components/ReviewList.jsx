import { useEffect, useState, useContext } from "react"
import { getReviewsByGameId, deleteReview, updateReview } from "../services/review.service"
import { AuthContext } from "../context/auth.context"
import "../CSS/ReviewList.css"

function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ content: "", rating: 0 })
  const { user } = useContext(AuthContext)
  const [hoverEditRating, setHoverEditRating] = useState(0)


  useEffect(() => {
    loadReviews()
  }, [gameId])

  const loadReviews = () => {
    getReviewsByGameId(gameId)
      .then((data) => {
        setReviews(data)
      })
      .catch((err) => {
        console.log("Error obteniendo la lista de reseñas", err)
      })
  }

  const handleDelete = (reviewId) => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      console.log("Necesitas iniciar sesión para borrar una reseña")
      return
    }

    if (window.confirm("¿Seguro que quieres borrar esta reseña?")) {
      deleteReview(reviewId, storedToken)
        .then(() => {
          loadReviews()
        })
        .catch((err) => {
          console.log("Error borrando la reseña", err)
        })
    }
  }

  const handleEditClick = (review) => {
    setEditingId(review._id)
    setEditData({ content: review.content, rating: review.rating })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditData({ content: "", rating: 0 })
  }

  const handleEditSave = (reviewId) => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      console.log("Necesitas iniciar sesión para actualizar una reseña")
      return
    }

    updateReview(reviewId, editData, storedToken)
      .then(() => {
        loadReviews()
        setEditingId(null)
        setEditData({ content: "", rating: 0 })
      })
      .catch((err) => {
        console.log("Error actualizando la reseña", err)
      })
  }

  const isOwner = (review) => {
    return user && review.author._id === user._id
  }

  return (
    <>
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
         {editingId === review._id ? (
  <div className="edit-form">
    <textarea
      value={editData.content}
      onChange={(e) => setEditData({ ...editData, content: e.target.value })}
      placeholder="Edita tu reseña"
    />

    <div className="edit-rating">
      <label>Puntuación:</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverEditRating || editData.rating) ? "filled" : ""}`}
            onClick={() => setEditData({ ...editData, rating: star })}
            onMouseEnter={() => setHoverEditRating(star)}
            onMouseLeave={() => setHoverEditRating(0)}
          >
            ★
          </span>
        ))}
        <span className="rating-number">{editData.rating} / 5</span>
      </div>
    </div>

    <button onClick={() => handleEditSave(review._id)} className="save-button">
      Guardar
    </button>
    <button onClick={handleEditCancel} className="cancel-button">
      Cancelar
    </button>
  </div>
) : (
            <>
              <div className="review-header">
                <span className="review-author">{review.author.name}</span>
                <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="rating-number">{review.rating}</div>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                ))}
              </div>

              <div className="review-content">{review.content}</div>

              {isOwner(review) && (
                <div className="review-actions">
                  <button onClick={() => handleEditClick(review)} className="edit-button">✏️ Editar</button>
                  <button onClick={() => handleDelete(review._id)} className="delete-button">🗑️ Borrar</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default ReviewList
