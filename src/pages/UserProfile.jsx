import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../CSS/UserProfile.css";

function UserProfile() {
  const { user, profile, isLoading, isLoggedIn, fetchProfile } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  if (isLoading || !profile) {
    return (
      <div className="profile-page">
        <div className="profile-shell">Cargando tu perfil...</div>
      </div>
    );
  }

  const favoriteGames = profile.favorites || [];
  const reviews = profile.reviews || [];

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div>
          <p className="eyebrow">Tu perfil</p>
          <h1>Hola, {user?.name}</h1>
          <p className="muted">{user?.email}</p>

          <div className="profile-stats">
            <div className="stat-card">
              <span className="stat-label">Favoritos</span>
              <span className="stat-value">{favoriteGames.length}</span>
              <span className="stat-hint">Juegos marcados con ♥</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Reseñas</span>
              <span className="stat-value">{reviews.length}</span>
              <span className="stat-hint">Opiniones publicadas</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <p className="muted">Rol</p>
            <p className="profile-role">{user?.role || "user"}</p>
            <p className="muted">Miembro desde</p>
            <p className="profile-date">
              {new Date(profile.createdAt || user?.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      <section className="favorites-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Tus favoritos</p>
            <h2>Juegos que amas</h2>
          </div>
          <Link to="/games" className="ghost-link">Explorar juegos</Link>
        </div>

        {favoriteGames.length === 0 ? (
          <div className="empty-state">
            <p>Aún no has marcado favoritos.</p>
            <Link to="/games" className="cta">Descubrir juegos</Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteGames.map((game) => (
              <Link key={game._id} to={`/games/${game._id}`} className="favorite-card">
                {game.image && (
                  <div className="favorite-thumb">
                    <img src={game.image} alt={game.title} />
                  </div>
                )}
                <div className="favorite-content">
                  <div className="favorite-top">
                    <h4>{game.title}</h4>
                    <span className="fav-rating">{(game.averageRating || 0).toFixed(1)}★</span>
                  </div>
                  <div className="favorite-meta">
                    <span className="chip">{game.developer || "Desarrollador"}</span>
                    <span className="chip">{game.year || "Año"}</span>
                  </div>
                  <div className="favorite-tags">
                    {(game.platforms || []).map((plat) => (
                      <span key={plat} className="badge">{plat}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="reviews-section profile-reviews">
        <div className="section-header">
          <div>
            <p className="eyebrow">Actividad</p>
            <h2>Tus reseñas</h2>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>Sin reseñas por ahora.</p>
            <Link to="/games" className="cta">Escribe tu primera reseña</Link>
          </div>
        ) : (
          <div className="review-log">
            {reviews.map((review) => (
              <article key={review._id} className="review-row">
                <div className="review-score">
                  <span className="score-number">{review.rating}</span>
                  <span className="score-label">/5</span>
                </div>
                <div className="review-body">
                  <div className="review-title-row">
                    <Link to={`/games/${review.game?._id}`} className="review-game-title">
                      {review.game?.title || "Juego"}
                    </Link>
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="review-text">{review.content}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserProfile;
