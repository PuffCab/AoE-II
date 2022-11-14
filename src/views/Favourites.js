import React, { useState } from 'react'
import FavCivilizations from '../components/Favourites/FavCivilizations'
import FavUnits from '../components/Favourites/FavUnits'
import NavBar from '../components/NavBar/NavBar'
import '../components/Favourites/Favourites.css'
import FavStructures from '../components/Favourites/FavStructures'
import FavTechnologies from '../components/Favourites/FavTechnologies'

function Favourites() {

  const [showCiv, setShowCiv] = useState(true)
  const [showUnits, setShowUnits] = useState(false)
  const [showTech, setShowTech] = useState(false)
  const [showStruc, setShowStruc] = useState(false)


  const handleUnits = () => {
    setShowUnits(true);
    setShowCiv(false);
    setShowTech(false);
    setShowStruc(false);
    console.log("Units");
  }

  const handleCiv = () => {
    setShowCiv(true);
    setShowUnits(false);
    setShowTech(false);
    setShowStruc(false);
    console.log("Civ");
  }

  const handleTech = () => {
    setShowTech(true);
    setShowCiv(false);
    setShowUnits(false);
    setShowStruc(false);
    console.log("Tech");
  }

  const handleStruc = () => {
    setShowStruc(true);
    setShowUnits(false);
    setShowTech(false);
    setShowCiv(false);
    console.log("Struc");
  }


  return (
    <>
        <NavBar />
          <div className="backgroundDiv">
            <br />
            <h1 className="favouriteTitle">Your favourites</h1>
            <br />
            <button className={showCiv ? "favouriteButtonsClicked" : "favouriteButtons"} onClick={handleCiv}>Civilizations</button>
            <button className={showUnits ? "favouriteButtonsClicked" : "favouriteButtons"} onClick={handleUnits}>Units</button>
            <button className={showTech ? "favouriteButtonsClicked" : "favouriteButtons"} onClick={handleTech}>Technologies</button>
            <button className={showStruc ? "favouriteButtonsClicked" : "favouriteButtons"} onClick={handleStruc}>Structures</button>
            <br /><br />
            
            {showCiv && <FavCivilizations />}
            {showUnits && <FavUnits />}
            {showTech && <FavTechnologies />}
            {showStruc && <FavStructures />}
        </div>
    </>
  )
}

export default Favourites