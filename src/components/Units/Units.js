import React from 'react'
import { useState, useEffect } from 'react';
import Unit from './Unit';

function Units() {

    const [units, setUnits] = useState([]);


    const fetchUnits = () => {
        const url = "https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/units";
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.units);
                setUnits(result.units);
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
          <div className='flex-container'>
              {units &&
                  units.map((unit) => {
                      return <Unit key={unit.id} unit={unit} />;
                  })}
          </div>
            
    </>
  )
}

export default Units