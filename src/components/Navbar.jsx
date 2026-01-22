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
            <Link to="/about"><button>About</button></Link>
            <Link to="/games"><button>Games</button></Link>
            <Link to="/games/create"><button>Create</button></Link>
            <button onClick={logOutUser}>Logout</button>
            {user && <span className="user-name">{user.name}</span>}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/about"><button>About</button></Link>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to="/login"><button>Login</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
