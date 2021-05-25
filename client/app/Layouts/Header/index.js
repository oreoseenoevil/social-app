import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GiCaptainHatProfile } from 'react-icons/gi'
import '@Layouts/Header/index.scss'
import { SearchBar } from '@Components/SearchBar'
import { Menu } from '@Components/Menu'
import { LayoutContext } from '@Context/Layout'

export const Header = ({ active, toggleDarkMode }) => {
  const { openMenu, toggleMenu } = useContext(LayoutContext)

  return (
    <div className={`header ${active && 'active'}`}>
      <div className="wrapper">
        <div className="left">
          <Link to="/" className="logo" replace>
            <GiCaptainHatProfile />
          </Link>
        </div>
        <SearchBar dark={active} />
        <div className="right">
          <div
            className={`burger ${openMenu && 'open-menu'} ${active && 'dark'}`}
            onClick={toggleMenu}
          >
            <span className="bar1"></span>
            <span className="bar2"></span>
          </div>
          <Menu toggleDarkMode={toggleDarkMode} active={active} />
        </div>
      </div>
    </div>
  )
}
