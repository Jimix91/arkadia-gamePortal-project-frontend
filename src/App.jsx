import { Routes, Route } from "react-router-dom"
import "./index.css"
import GameList from "./components/gameList"
import Navbar from "./components/Navbar"
import CreateGame from "./components/CreateGame"
import EditGame from "./components/editGame"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import HomePage from "./pages/homePage"
import GameDetails from "./pages/gameDetails"
import AboutPage from "./pages/aboutPage"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        
        <Route path="/create" element={<IsPrivate><CreateGame /></IsPrivate>}/>

        
        <Route path="/api/games" element={<GameList />} />

      
        <Route path="/api/games/:gameId" element={<GameDetails />} />

      
        <Route path="/edit/:gameId" element={ <IsPrivate> <EditGame />  </IsPrivate>  }/>

        <Route  path="/signup" element={   <IsAnon> <SignupPage /> </IsAnon> } />

        <Route  path="/login" element={  <IsAnon>   <LoginPage />  </IsAnon> } />

      </Routes>
    </>
  )
}

export default App

