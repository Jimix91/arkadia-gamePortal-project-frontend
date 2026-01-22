import { Routes, Route } from "react-router-dom"
import "./index.css"
import GameList from "./components/GameList"
import Navbar from "./components/Navbar"
import CreateGame from "./components/CreateGame"
import EditGame from "./components/EditGame"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import HomePage from "./pages/HomePage"
import GameDetails from "./pages/GameDetails"
import AboutPage from "./pages/AboutPage"
import FilteredGamesPage from "./pages/FilteredGamesPage"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        
        <Route path="/games/create" element={<IsPrivate><CreateGame /></IsPrivate>}/>

        
        <Route path="/games" element={<FilteredGamesPage />} />

      
        <Route path="/games/:gameId" element={<GameDetails />} />

      
        <Route path="/games/edit/:gameId" element={ <IsPrivate> <EditGame />  </IsPrivate>  }/>

        <Route  path="/signup" element={   <IsAnon> <SignupPage /> </IsAnon> } />

        <Route  path="/login" element={  <IsAnon>   <LoginPage />  </IsAnon> } />

      </Routes>
      <Footer />
    </>
  )
}

export default App

