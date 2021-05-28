import React from 'react'
import { Link } from 'react-router-dom'
import { GiCaptainHatProfile } from 'react-icons/gi'
import '@Layouts/Header/index.scss'
import { SearchBar } from '@Components/SearchBar'
import { Menu } from '@Components/Menu'

export const Header = ({ dark, toggleDarkMode, toggleMenu, isComponentVisible }) => {
  return (
    <div className={`header ${dark && 'dark'}`}>
      <div className="wrapper">
        <div className="left">
          <Link to="/" className="logo" replace>
            <GiCaptainHatProfile />
          </Link>
        </div>
        <SearchBar dark={dark} />
        <div className="right">
          <div
            className={`burger ${isComponentVisible && 'open-menu'} ${dark && 'dark'}`}
            onClick={toggleMenu}
          >
            <span className="bar1"></span>
            <span className="bar2"></span>
          </div>
          <Menu toggleDarkMode={toggleDarkMode} dark={dark} />
        </div>
      </div>
    </div>
  )
}
