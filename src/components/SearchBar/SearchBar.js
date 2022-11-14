import React from 'react'


function SearchBar({ searchInput, setSearchInput }) {

    

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    };

  return (
      <>
          <div>
              <input type="text" id="search-bar" placeholder="Search..." onChange={handleChange} value={searchInput}></input>
          </div>
      </>
  )
}

export default SearchBar