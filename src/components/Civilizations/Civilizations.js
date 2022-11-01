import React from 'react';
import { useState, useEffect } from 'react';
import Civilization from './Civilization';

function Civilizations() {

    const [civilizations, setCivilizations] = useState([]);


    const fetchCivilizations = () => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.civilizations);
                setCivilizations(result.civilizations);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }


    useEffect(() => {
        fetchCivilizations();
    }, []);

    return (
        <>
            <div className='flex-container'>
                {civilizations &&
                    civilizations.map((civilization) => {
                        return <Civilization key={civilization.id} civilization={civilization} />;
                    })}
            </div>
        </>
  )
}

export default Civilizations