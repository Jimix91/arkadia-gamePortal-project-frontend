import { useState, useContext } from "react"
import { createReview } from "../services/review.service"
import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom"

function CreateReview({ gameId, onReviewCreated }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ content: "", rating: 5 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!formData.content.trim()) {
      setError("Please write a review")
      setLoading(false)
      return
    }

    const storedToken = localStorage.getItem("authToken")

    if (!storedToken) {
      setError("You need to be logged in to create a review")
      setLoading(false)
      return
    }

    createReview(gameId, formData, storedToken)
      .then(() => {
        setFormData({ content: "", rating: 5 })
        setShowForm(false)
        onReviewCreated()
      })
      .catch((err) => {
        console.error("Error creating review", err)
        setError("Failed to create review. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({ content: "", rating: 5 })
    setError(null)
  }

    if (!user) {
        return (
            <Link to="/login">
                <button
                    className="create-review-button"
                >
                    ⭐ Create Review
                </button>
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
          ⭐ Create Review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="review-form">
          <h4>Write Your Review</h4>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="content">Your Review:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your thoughts about this game..."
              minLength={10}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Posting..." : "Post Review"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateReview
