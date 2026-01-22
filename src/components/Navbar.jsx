import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";                     
import { AuthContext } from "../context/auth.context";
import "../CSS/Navbar.css";
import Logo from "../assets/logoArkadia1.png"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav>
      {/* Título de la app */}
      <div className="nav-left">
        <Link to="/"  className="app-title"><img src={Logo} alt="Arkadia Logo" className="app-logo" /></Link>
      </div>

      {/* Barra de búsqueda */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      {/* Botones de navegación */}
      <div className="nav-right">
        {isLoggedIn && (
          <>
            <Link to="/about"><button>Acerca</button></Link>
            <Link to="/games"><button>Juegos</button></Link>
            {user?.role === "admin" && (
              <Link to="/admin"><button className="btn-admin">👤 Admin</button></Link>
            )}
            {user?.role === "admin" && (
              <Link to="/games/create"><button>Crear</button></Link>
            )}
            <button onClick={logOutUser}>Salir</button>
            {user && <span className="user-name">{user.name}</span>}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/about"><button>Acerca</button></Link>
            <Link to="/signup"><button>Registro</button></Link>
            <Link to="/login"><button>Entrar</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
