import React from 'react'
import { Link } from 'react-router-dom'
import { GiCaptainHatProfile } from 'react-icons/gi'
import '@Layouts/Header/index.scss'
import { SearchBar } from '@Components/SearchBar'
import { Menu } from '@Components/Menu'
import { useComponentVisible } from '@Helpers'

export const Header = ({ dark, toggleDarkMode }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)

  const toggleMenu = () => setIsComponentVisible(!isComponentVisible)

  return (
    <div className={`header ${dark && 'dark'}`}>
      <div className="wrapper">
        <div className="left">
          <Link to="/" className="logo" replace>
            <GiCaptainHatProfile />
          </Link>
        </div>
        <SearchBar dark={dark} />
        <div className="right" ref={ref}>
          <div
            className={`burger ${isComponentVisible && 'open-menu'} ${
              dark && 'dark'
            }`}
            onClick={toggleMenu}
          >
            <span className="bar1"></span>
            <span className="bar2"></span>
          </div>
          <Menu
            toggleDarkMode={toggleDarkMode}
            dark={dark}
            mobileActive={isComponentVisible}
          />
        </div>
      </div>
    </div>
  )
}
