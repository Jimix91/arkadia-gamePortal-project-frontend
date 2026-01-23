import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";                     
import { AuthContext } from "../context/auth.context";
import "../CSS/Navbar.css";
import Logo from "../assets/logoArkadia1.png"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);
  const handleLogout = () => {
    logOutUser();
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest('nav')) {
        closeMenu();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav>
      {/* Título de la app */}
      <div className="nav-left">
        <Link to="/"  className="app-title"><img src={Logo} alt="Arkadia Logo" className="app-logo" /></Link>
      </div>

      <button className={`hamburger ${open ? "is-open" : ""}`} onClick={toggleMenu} aria-label="Abrir menú de navegación">
        <span />
        <span />
        <span />
      </button>

      {/* Botones de navegación */}
      <div className={`nav-right ${open ? "open" : ""}`}>
        {isLoggedIn && (
          <>
            <Link to="/about" onClick={closeMenu}><button>Acerca</button></Link>
            <Link to="/games" onClick={closeMenu}><button>Juegos</button></Link>
            {user?.role === "admin" && (
              <Link to="/admin" onClick={closeMenu}><button className="btn-admin">👤 Admin</button></Link>
            )}
            {user?.role === "admin" && (
              <Link to="/games/create" onClick={closeMenu}><button>Crear</button></Link>
            )}
            <Link to="/profile" className="user-name" onClick={closeMenu}>
              <span className="user-initial">{user?.name?.[0] || "U"}</span>
              <span>{user?.name}</span>
            </Link>
            <button onClick={handleLogout}>Salir</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/about" onClick={closeMenu}><button>Acerca</button></Link>
            <Link to="/games" onClick={closeMenu}><button>Juegos</button></Link>
            <Link to="/signup" onClick={closeMenu}><button>Registro</button></Link>
            <Link to="/login" onClick={closeMenu}><button>Entrar</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
