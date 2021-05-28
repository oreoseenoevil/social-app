import React from 'react'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiArrowDropDownLine, RiContrastFill, RiLogoutBoxRLine, RiProfileLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { Avatar } from '@Components/Avatar'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '@Components/Menu/index.scss'
import { useComponentVisible } from '@Helpers'

import { logout } from '@Actions'

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
  const history = useHistory()

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
        { isComponentVisible &&
            <div className={`dropdown-menu ${dark && 'dark'}`}>
              <div
                className="dropdown-item"
                onClick={() => history.push(`/profile/${auth.user._id}`)}
              >
                <span>Profile</span>
                <CgProfile />
              </div>
              <span className={`dropdown-line ${dark && 'dark'}`}></span>
              <div className="dropdown-item"
                onClick={toggleDarkMode}
              >
                <span>
                  Dark mode
                </span>
                <RiContrastFill />
              </div>
              <span className={`dropdown-line ${dark && 'dark'}`}></span>
              <div className="dropdown-item"
                onClick={() => dispatch(logout())}
              >
                <span>Sign out</span>
                <RiLogoutBoxRLine />
              </div>
            </div>
        }
      </li>
    </ul>
  )
}

export const MobileMenu = ({ dark, toggleDarkMode, wrapperRef, toggleMenu, isComponentVisible }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

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
