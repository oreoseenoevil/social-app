import React from 'react'
import { Link } from 'react-router-dom'
import { RiContrastFill } from 'react-icons/ri'
import '@Layouts/Header/index.scss'

export const Header = ({ active, toggleDarkMode }) => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="left">
          <Link to="/" className="logo" replace>
            Social
          </Link>
        </div>
        <div className="middle">
          hello
        </div>
        <div className="right">
          <RiContrastFill
            className={`bulb ${active && 'dark'}`}
            onClick={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  )
}
