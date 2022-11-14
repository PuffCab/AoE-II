import React from 'react'
import { useState, useEffect } from 'react';
import Unit from './Unit';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

function Units({ searchInput }) {

    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    let filteredUnits = units

    
    if (searchInput.length > 0) {filteredUnits = 
        units.filter((unit) => {
            return unit.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }


    const fetchUnits = () => {
        const url = "https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/units";
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.units);
                setUnits(result.units);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    useEffect(() => {
        fetchUnits();
    }, []);


  return (
      <>          
          {!loading ? (
              <div className='flex-container'>
              {filteredUnits &&
                  filteredUnits.map((unit) => {
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

export default Units