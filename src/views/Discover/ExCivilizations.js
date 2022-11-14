import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Civilizations from '../../components/Civilizations/Civilizations'
import '../../components/SearchBar/SearchBar.css'
import SearchBar from '../../components/SearchBar/SearchBar';

function ExCivilizations() {

  const [searchInput, setSearchInput] = useState("");

  
    return (
      <>
        <NavBar />
        <div className="backgroundDiv">
          <br/>
          <div className="searchBar" id="search-bar-civ">
            <h1 className="discoverFont">Discover the Civilizations</h1>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
          </div>
          <br/>
          
          <Civilizations searchInput={searchInput} />
        </div>
    </>
  )
}

export default ExCivilizations