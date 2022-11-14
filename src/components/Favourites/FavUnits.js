import React, { useState } from 'react'
import Unit from '../Units/Unit';
import Loader from '../Loader/Loader';

function FavUnits() {

  const [loading, setLoading] = useState(true);

    let favouriteUnits = []

    




  return (
    <>
      <h1 className="favouriteTitle">Favourite Units</h1>
      {!loading ? (
              <div className='flex-container'>
              {favouriteUnits &&
                  favouriteUnits.map((unit) => {
                      return <Unit key={unit.id} unit={unit} />;
                  })}
              </div>
            ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
          )}  
    </>
  )
}

export default FavUnits