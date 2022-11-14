import React, { useEffect, useState } from 'react'
import Structure from './Structure';
import Loader from '../Loader/Loader';
import './Structures.css'
import Table from 'react-bootstrap/esm/Table';

function Structures({ searchInput }) {

    const [structures, setStructures] = useState([]);
    const [loading, setLoading] = useState(true);

    let filteredStructures = structures

    
    if (searchInput.length > 0) {filteredStructures = 
        structures.filter((structure) => {
            return structure.name.toLowerCase().includes(searchInput.toLowerCase());
        });
    }


    const fetchStructures = () => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/structures`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.structures);
                setStructures(result.structures);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    useEffect(() => {
        fetchStructures();
    }, []);


  return (
      <>
          {!loading ? (
          <Table striped bordered hover style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
          <thead>
            <tr>
              <th style={{border: "2px solid black"}}>Id</th>
              <th style={{border: "2px solid black"}}>Name</th>
              <th style={{border: "2px solid black"}}>Age</th>
              <th style={{border: "2px solid black"}}>Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredStructures &&
                filteredStructures.map((structure) => {
                    return <Structure key={structure.id} structure={structure} />;
                })}
          </tbody>
        </Table>
          ) : (
              <div className="loaderDiv">
                <Loader />
              </div>
          )}
          
      </>
  )
}

export default Structures