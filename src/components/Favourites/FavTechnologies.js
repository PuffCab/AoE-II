import React, { useEffect, useState } from 'react'
import Technology from '../../components/Technologies/Technology';
import Loader from '../../components/Loader/Loader';
import Table from 'react-bootstrap/esm/Table';


function FavTechnologies() {

    const [loading, setLoading] = useState(true);

    let favouriteTechnologies = []


  return (
    <>
      <h1 className="favouriteTitle">Favourite Technologies</h1>
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
            {favouriteTechnologies &&
                favouriteTechnologies.map((technology) => {
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

export default FavTechnologies