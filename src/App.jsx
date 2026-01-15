import { Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from '../pages/homePage'
import Navbar from '../components/navbar'
import AboutPage from '../pages/aboutPage'
import CreateGame from '../components/createGame'
import GameDetails from '../pages/gameDetails'
import SignupPage from '../pages/signupPage'
import LoginPage from '../pages/LoginPage'

function App() {
  

  return (
    <>
    <Navbar  />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/games/:gameID" element={<GameDetails /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>
    </>
  )
}

export default App
