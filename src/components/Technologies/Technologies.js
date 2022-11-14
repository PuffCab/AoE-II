import React, { useEffect, useState } from 'react'
import Technology from './Technology';
import './Technologies.css'
import Loader from '../Loader/Loader';
import Table from 'react-bootstrap/Table';

function Technologies({ searchInput }) {

    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);

    let filteredTechnlogies = technologies

    
    if (searchInput.length > 0) {filteredTechnlogies = 
        technologies.filter((technology) => {
            return technology.name.toLowerCase().includes(searchInput.toLowerCase())  || technology.description.toLowerCase().includes(searchInput.toLowerCase());
        });
    }


    const fetchTechnologies = () => {
        const url = `https://cab-cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/technologies`;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.technologies);
                setTechnologies(result.technologies);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
  }


    useEffect(() => {
        fetchTechnologies();
    }, []);


  return (
      <>
          {!loading ? (
          <Table striped bordered hover style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechnlogies &&
                filteredTechnlogies.map((technology) => {
                  return <Technology key={technology.id} technology={technology} />;
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

export default Technologies