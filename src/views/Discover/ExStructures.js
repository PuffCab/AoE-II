import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Structures from '../../components/Structures/Structures';
import SearchBar from '../../components/SearchBar/SearchBar';

function ExStructures() {
    
    const [searchInput, setSearchInput] = useState("");


  return (
      <>
        <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-civ">
            <h1 className="discoverFont">Discover</h1>
            <h1 className="discoverFont">the Structures</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
          <Structures searchInput={searchInput} />
        </div>
      </>
  )
}

export default ExStructures