import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GiCaptainHatProfile } from 'react-icons/gi'
import '@Layouts/Header/index.scss'
import { SearchBar } from '@Components/SearchBar'
import { Menu } from '@Components/Menu'
import { LayoutContext } from '@Context/Layout'

export const Header = ({ dark, toggleDarkMode }) => {
  const { openMenu, toggleMenu } = useContext(LayoutContext)

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
            className={`burger ${openMenu && 'open-menu'} ${dark && 'dark'}`}
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
