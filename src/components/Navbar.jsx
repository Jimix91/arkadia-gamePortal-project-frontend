import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context";
import "../CSS/Navbar.css";
import Logo from "../assets/logoArkadia1.png"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      {/* Título de la app */}
      <div className="nav-left">
        <Link to="/"  className="app-title"><img src={Logo} alt="Arkadia Logo" className="app-logo" /></Link>
      </div>

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
            <Link to="/games"><button>Juegos</button></Link>
            <Link to="/signup"><button>Registro</button></Link>
            <Link to="/login"><button>Entrar</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
