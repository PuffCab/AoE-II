import React from 'react'
import './Units.css'

function Unit({ unit }) {

  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images/Units', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <div className="cardUnit">
        <img className="cardImgUnit" src={images[`${unit.id}.png`]} alt={unit.name}></img>
        <div className="cardBodyUnit">
          <h1 className="titleUnit">{unit.name}</h1>
        </div>
        <a href="#" className='stretched-link'></a>
      </div>
    </>
  )
}

export default Unit