import React from 'react'
import './Units.css'
import { Link } from 'react-router-dom';

function Unit({ unit }) {

  function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../Images/Units', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <div className="cardUnit">
        <img className="cardImgUnit" src={images[`${unit.id}.png`]} alt={unit.name}></img>
        <div className="cardBodyUnit">
          <h1 className="titleUnit">{unit.name}</h1>
        </div>
        <Link to={`${unit.id}`} className="stretched-link"></Link>
      </div>
    </>
  )
}

export default Unit