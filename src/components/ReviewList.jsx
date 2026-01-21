import { useEffect, useState, useContext } from "react"
import { getReviewsByGameId, deleteReview, updateReview } from "../services/review.service"
import { AuthContext } from "../context/auth.context"
import "../CSS/ReviewList.css"

function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ content: "", rating: 0 })
  const { user } = useContext(AuthContext)

  useEffect(() => {
    loadReviews()
  }, [gameId])

  const loadReviews = () => {
    getReviewsByGameId(gameId)
      .then((data) => {
        setReviews(data)
      })
      .catch((err) => {
        console.log("Something went wrong trying to get the Reviews List", err)
      })
  }

  const handleDelete = (reviewId) => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      console.log("You need to be logged in to delete a review")
      return
    }

    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(reviewId, storedToken)
        .then(() => {
          loadReviews()
        })
        .catch((err) => {
          console.log("Something went wrong deleting the review", err)
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
      console.log("You need to be logged in to update a review")
      return
    }

    updateReview(reviewId, editData, storedToken)
      .then(() => {
        loadReviews()
        setEditingId(null)
        setEditData({ content: "", rating: 0 })
      })
      .catch((err) => {
        console.log("Something went wrong updating the review", err)
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
                placeholder="Edit your review"
              />
              <input
                type="number"
                min="1"
                max="10"
                value={editData.rating}
                onChange={(e) => setEditData({ ...editData, rating: Number(e.target.value) })}
              />
              <button onClick={() => handleEditSave(review._id)} className="save-button">
                Save
              </button>
              <button onClick={handleEditCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.author.name}</span>
                  <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="rating-stars">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                  ))}
                </div>

                <div className="review-content">{review.content}</div>

                {isOwner(review) && (
                  <div className="review-actions">
                    <button onClick={() => handleEditClick(review)} className="edit-button">✏️ Edit</button>
                    <button onClick={() => handleDelete(review._id)} className="delete-button">🗑️ Delete</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default ReviewList
