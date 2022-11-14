import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Units from '../../components/Units/Units'
import SearchBar from '../../components/SearchBar/SearchBar';

function ExUnits() {

  const [searchInput, setSearchInput] = useState("");


    return (
      <>
        <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-units">
            <h1 className="discoverFont">Discover the Units</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
          <Units searchInput={searchInput} />
        </div>
    </>
  )
}

export default ExUnits