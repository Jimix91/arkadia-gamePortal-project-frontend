import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { GoogleLogin } from "@react-oauth/google";
import authService from "../services/auth.service";
import "../CSS/SignupAndLoginPage.css"

const API_URL = import.meta.env.VITE_API_URL;


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  
  const { storeToken, authenticateUser } = useContext(AuthContext);

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error al iniciar sesión";
        setErrorMessage(errorDescription);
      })
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      setErrorMessage("Falló el inicio con Google. Intenta de nuevo.");
      return;
    }

    authService.googleLogin(credential)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Falló el inicio con Google";
        setErrorMessage(errorDescription);
      });
  };

  const handleGoogleError = () => {
    setErrorMessage("Falló el inicio con Google. Intenta de nuevo.");
  };
  
  return (
    <div className="LoginPage">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleLoginSubmit} autoComplete="on">
        <label>Correo:</label>
        <input
          type="email"
          name="email"
          value={email}
          autoComplete="email"
          onChange={handleEmail}
        />

        <label>Contraseña:</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <button
            type="button"
            className="toggle-password"
            aria-label="Mantén presionado para mostrar la contraseña"
            title="Mantén presionado para mostrar la contraseña"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
            onTouchStart={() => setShowPassword(true)}
            onTouchEnd={() => setShowPassword(false)}
            onTouchCancel={() => setShowPassword(false)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                setShowPassword(true);
              }
            }}
            onKeyUp={() => setShowPassword(false)}
          >
            {showPassword ? (
              // Ojo abierto
              <svg className="eye-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3.2" />
              </svg>
            ) : (
              // Ojo cerrado (con línea)
              <svg className="eye-icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                <circle cx="12" cy="12" r="3.2" />
                <path className="eye-slash" d="M4 4l16 16" />
              </svg>
            )}
          </button>
        </div>

        <button type="submit">Entrar</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <div className="social-login">
        <p>O continúa con</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>

      <p>¿Aún no tienes cuenta?</p>
      <Link to={"/signup"}> Regístrate</Link>
    </div>
  )
}

export default LoginPage;
