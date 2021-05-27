import React from 'react'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiArrowDropDownLine, RiContrastFill, RiLogoutBoxRLine, RiProfileLine } from 'react-icons/ri'
import { Avatar } from '@Components/Avatar'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '@Components/Menu/index.scss'
import { useComponentVisible } from '@Helpers'

import { logout } from '@Actions/Auth'

const navLinks = [
  { label: 'Home', icon: RiHome2Line, path: '/' },
  { label: 'Messages', icon: RiMessageLine, path: '/messages' },
  { label: 'Discover', icon: RiCompassDiscoverLine, path: '/discover' },
  { label: 'Notifications', icon: RiNotification2Line, path: '/notifications' }
]

export const Menu = ({ toggleDarkMode, dark }) => {
  const { auth } = useSelector(state => state)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isActive = pn => {
    if (pn === pathname) {
      return 'active'
    }
  }

  return (
    <ul className="menu">
      {
        navLinks.map((link, index) => (
          <li key={index}>
            <Link className={`nav-link ${isActive(link.path)}`} to={link.path}>
              <link.icon />
            </Link>
          </li>
        ))
      }
      <li className="user"
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <span>
          <Avatar src={auth.user.avatar} size="small" active={isComponentVisible} />
          <RiArrowDropDownLine className="dropdown" />
        </span>
        <div className="user-menu">
          <ul className={`nav-dropdown ${isComponentVisible && 'active'} ${dark && 'dark'}`}>
            <li><Link to={`/profile/${auth.user._id}`} replace>Profile</Link></li>
            <li>
              <span onClick={toggleDarkMode}>
                Dark mode
              </span>
            </li>
            <li>
              <Link to="/" 
                replace
                onClick={() => dispatch(logout())}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}

export const MobileMenu = ({ dark, toggleDarkMode, wrapperRef, setIsComponentVisible, isComponentVisible }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const toggleMenu = () => setIsComponentVisible(!isComponentVisible)

  return (
    <div
      className={`mobile ${dark && 'dark'} ${isComponentVisible && 'active'}`}
      ref={wrapperRef}
    >
      <ul className="mobile-menu">
        <li onClick={toggleMenu}>
          <Link
            to={`/profile/${auth.user._id}`}
            replace
            className="menu-item"
          >
            <RiProfileLine className="menu-icon" />
            <span>Profile</span>
          </Link>
        </li>
        {
          navLinks.map((link, index) => (
            <li key={index} onClick={toggleMenu}>
              <Link className="menu-item" to={link.path}>
                <link.icon className="menu-icon" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))
        }
        <li onClick={toggleMenu}>
          <span className="menu-item" onClick={toggleDarkMode}>
            <RiContrastFill className="menu-icon" />
            <span>
              Dark mode
            </span>
          </span>
        </li>
        <li onClick={toggleMenu}>
          <Link to="/" 
            replace
            className="menu-item"
            onClick={() => dispatch(logout())}
          >
            <RiLogoutBoxRLine className="menu-icon" />
            <span>
              Sign out
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
