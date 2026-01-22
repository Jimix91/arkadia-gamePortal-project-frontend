import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import "../CSS/SignupAndLoginPage.css"
 
const API_URL = import.meta.env.VITE_API_URL;
 
 
function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
 
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
 
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
 
    const requestBody = { email, password, name };
 

    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Error al registrarse";
        setErrorMessage(errorDescription);
      })
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const credential = credentialResponse?.credential;

    if (!credential) {
      setErrorMessage("Falló el registro con Google. Intenta de nuevo.");
      return;
    }

    authService.googleLogin(credential)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error?.response?.data?.message || "Falló el registro con Google";
        setErrorMessage(errorDescription);
      });
  };

  const handleGoogleError = () => {
    setErrorMessage("Falló el registro con Google. Intenta de nuevo.");
  };
 
  
  return (
    <div className="SignupPage">
      <h1>Crear cuenta</h1>
 
      <form onSubmit={handleSignupSubmit} autoComplete="on">
        <label>Correo:</label>
        <input 
          type="email"
          name="email"
          value={email}
          autoComplete="email"
          onChange={handleEmail}
        />
 
        <label>Contraseña:</label>
        <input 
          type="password"
          name="password"
          value={password}
          autoComplete="new-password"
          onChange={handlePassword}
        />
 
        <label>Nombre:</label>
        <input 
          type="text"
          name="name"
          value={name}
          autoComplete="name"
          onChange={handleName}
        />
 
        <button type="submit">Registrarme</button>
      </form>
 
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <div className="social-login">
        <p>O continúa con</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>
 
      <p>¿Ya tienes cuenta?</p>
      <Link to={"/login"}> Inicia sesión</Link>
    </div>
  )
}
 
export default SignupPage;