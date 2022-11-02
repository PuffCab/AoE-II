import React from 'react'
import { Link } from 'react-router-dom'
import './Civilizations.css'

function Civilization({ civilization }) {

  function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../Images/Civilizations', false, /\.(png|jpe?g|svg)$/));
  


  return (
    <>
      <div className="cardCiv">
        <img className="cardImgCiv" src={images[`${civilization.name}.png`]} alt={civilization.name}></img>
        <div className="cardBodyCiv">
          <h1 className="titleCiv">{civilization.name}</h1>
        </div>
        <Link to={`${civilization.id}`} className="stretched-link"></Link>
      </div>
    </>
  )
}

export default Civilization