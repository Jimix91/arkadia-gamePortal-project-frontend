import { useEffect, useState } from "react"
import { API_URL } from "../context/auth.context"
import { useNavigate } from "react-router-dom"

function CreateGame() {
  
const {title, setTitle} = useState("")
const {image, setImage}= useState("")
const {platforms, setPlatforms} = useState("")
const {description, setDescription} = useState("")

const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGame = {

      title: title,
      image: image,
      platforms: platforms,
      description: description,

    }

    axios
      .post(`${API_URL}/games`, newGame)
      .then(() => {
        navigate("/games")
          .catch((err) => {
            console.log("Something went wrong adding your game", err)
          })

      })

}

  return (
    <>
      <form action={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g Super Mario"
          required
        />
        <label>Image</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://....."
        />
        <label>Platforms</label>
        <input
          type="text"
          value={platforms}
          onChange={(e) => setPlatforms(e.target.value)}
          placeholder="PC, XBOX, PS5,..."
          required
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="This game is about...."
        />

      </form>
      <button className="form-button" type="submit">
          Save Game
        </button>
    </>
  )
}

export default CreateGame