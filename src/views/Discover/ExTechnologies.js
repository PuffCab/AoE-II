import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Technologies from '../../components/Technologies/Technologies'
import SearchBar from '../../components/SearchBar/SearchBar';

function ExTechnologies() {

  const [searchInput, setSearchInput] = useState("");


  return (
      <>
        <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-civ">
            <h1 className="discoverFont">Discover the Technologies</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
          
        <Technologies searchInput={searchInput} />
        </div>
      </>
  )
}

export default ExTechnologies