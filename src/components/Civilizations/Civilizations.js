import React from 'react';
import { useState, useEffect } from 'react';
import Civilization from './Civilization';
import Loader from '../Loader/Loader';

function Civilizations({ searchInput }) {

    const [civilizations, setCivilizations] = useState([]);
    const [loading, setLoading] = useState(true);

    let filteredCivilizations = civilizations

    
    if (searchInput.length > 0) {filteredCivilizations = 
        civilizations.filter((civilization) => {
            return civilization.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }

    const fetchCivilizations = () => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.civilizations);
                setCivilizations(result.civilizations);
                setLoading(false);
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
            {!loading ? (
              <div className='flex-container'>
                {filteredCivilizations &&
                    filteredCivilizations.map((civilization) => {
                        return <Civilization key={civilization.id} civilization={civilization} />;
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

export default Civilizations