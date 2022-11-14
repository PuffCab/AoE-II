import React, { useEffect, useState } from 'react'
import Structure from '../../components/Structures/Structure';
import Loader from '../../components/Loader/Loader';
import Table from 'react-bootstrap/esm/Table';

function FavStructures() {

    const [loading, setLoading] = useState(true);

    let favouriteStructures = []


  return (
    <>
      <h1 className="favouriteTitle">Favourite Structures</h1>
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
            {favouriteStructures &&
                favouriteStructures.map((structure) => {
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

export default FavStructures