import React, { useContext } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Home() {

  const { user, logout } = useContext(AuthContext)
  
  return (
    <div className="homeDiv">
        <div className="gridMenu">
          <div></div>
        {!user ? <Link to="/register" id="menuGridButton1"><button className="menuGridButtons">Register</button></Link> : <Link to="/favourites" id="menuGridButton1"><button className="menuGridButtons">Favourites</button></Link>}
        {!user ? <Link to="/login" id="menuGridButton2"><button className="menuGridButtons">Log In</button></Link> : <button onClick={logout} id="menuGridButton2" className="menuGridButtonsLogOut">Log Out</button> }
          <div></div>
          <Link to="/civilizations" id="menuButton1"><button className="menuButton">Discover the Civilizations</button></Link>
          <div></div>
          <Link to="/units" id="menuButton2"><button className="menuButton">Discover the Units</button></Link>
          <div></div>
          <Link to="/technologies" id="menuButton3"><button className="menuButton">Discover the Technologies</button></Link>
          <div></div>
          <Link to="/structures" id="menuButton4"><button className="menuButton">Discover the Structures</button></Link>
          <div></div>
          <Link id="menuButton5"><button className="menuButton">Contact</button></Link>
          <div></div>
        </div>
    </div>
  )
}

export default Home