import React from 'react'
import './Loader.css'
import HourGlass from '../../Images/Loader/hourglass.gif'

function Loader() {
  return (
      <>
          <br /><br /><br />
          <img className="loaderImg" src={HourGlass} alt="loading"></img>
          <br /><br /><br /><br />
      </>

  )
}

export default Loader