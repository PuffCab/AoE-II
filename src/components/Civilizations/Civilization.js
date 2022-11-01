import React from 'react'
import './Civilizations.css'

function Civilization({ civilization }) {

  function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./Images/Civilizations', false, /\.(png|jpe?g|svg)$/));
  


  return (
    <>
      <div className="cardCiv">
        <img className="cardImgCiv" src={images[`${civilization.name}.png`]} alt={civilization.name}></img>
        <div className="cardBodyCiv">
          <h1 className="titleCiv">{civilization.name}</h1>
        </div>
        <a href="#" className='stretched-link'></a>
      </div>
      


      {/* <Card style={{ width: '9rem'}} className="card">
        <Card.Img style={{
          width: '100px',
          display: 'block',
          margin: 'auto',
          marginTop: "15px"
          }} className="card-img" src={images[`${civilization.name}.png`]} alt={civilization.name} />
        <Card.Body>
        <Card.Title style={{textAlign: 'center', fontFamily:'Luminari, fantasy'}}>{civilization.name}</Card.Title>
        </Card.Body>
        <Card.Link href="#" className='stretched-link'></Card.Link>
      </Card> */}
    </>
  )
}

export default Civilization