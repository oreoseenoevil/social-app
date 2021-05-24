import React, { useState } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import '@Components/SearchBar/index.scss'

export const SearchBar = ({ dark }) => {
  const [search, setSearch] = useState('')

  return (
    <div className="search-bar">
      <form className="search-form">
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          className={search && 'searching'}
          onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
        />
        {
          !search ? <div className="search-icon">
            <RiSearchLine className={`icon-search ${dark && 'dark'}`} />
          </div> :
            <div className="close-search">
              <RiCloseLine
                className={`close ${dark && 'dark'}`} 
              />
            </div>
        }
      </form>
    </div>
  )
}
