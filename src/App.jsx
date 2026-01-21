import { Routes, Route } from "react-router-dom"
import "./index.css"
import GameList from "./components/GameList_temp"
import Navbar from "./components/Navbar"
import CreateGame from "./components/CreateGame_temp"
import EditGame from "./components/EditGame_temp"
import SignupPage from "./pages/SignupPage_temp"
import LoginPage from "./pages/LoginPage_temp"
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import HomePage from "./pages/HomePage_temp"
import GameDetails from "./pages/GameDetails_temp"
import AboutPage from "./pages/AboutPage_temp"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about" element={<AboutPage />} />

        
        <Route path="/games/create" element={<IsPrivate><CreateGame /></IsPrivate>}/>

        
        <Route path="/games" element={<GameList />} />

      
        <Route path="/games/:gameId" element={<GameDetails />} />

      
        <Route path="/games/edit/:gameId" element={ <IsPrivate> <EditGame />  </IsPrivate>  }/>

        <Route  path="/signup" element={   <IsAnon> <SignupPage /> </IsAnon> } />

        <Route  path="/login" element={  <IsAnon>   <LoginPage />  </IsAnon> } />

      </Routes>
    </>
  )
}

export default App

