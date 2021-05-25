import React, { useState, useRef, useEffect } from 'react'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiArrowDropDownLine, RiContrastFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '@Components/Menu/index.scss'

import { logout } from '@Actions/auth'

const navLinks = [
  { label: 'Home', icon: RiHome2Line, path: '/' },
  { label: 'Messages', icon: RiMessageLine, path: '/messages' },
  { label: 'Discover', icon: RiCompassDiscoverLine, path: '/discover' },
  { label: 'Notifications', icon: RiNotification2Line, path: '/notifications' }
]

export const Menu = ({ toggleDarkMode }) => {
  const [dropdownOn, setDropdownOn] = useState(false)
  const { auth } = useSelector(state => state)

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isActive = pn => {
    if (pn === pathname) {
      return 'active'
    }
  }

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
         * Alert if clicked on outside of element
         */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOn(false)
        }
      }
  
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
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
        ref={wrapperRef}
        onClick={() => setDropdownOn(!dropdownOn)}
      >
        <span>
          {auth.user.avatar === '' ? <FaRegUserCircle className="avatar" /> : <img src={auth.user.avatar} alt="avatar" className={`avatar image ${dropdownOn && 'active'}`} />}
          <RiArrowDropDownLine className="dropdown" />
        </span>
        <ul className={`nav-dropdown ${dropdownOn && 'active'}`}>
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
      </li>
    </ul>
  )
}

export const MobileMenu = ({ active, toggleDarkMode, toggleMenu }) => {

  const dispatch = useDispatch()

  return (
    <div className={`mobile ${active && 'active'}`}>
      <ul className="mobile-menu">
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
          <span className="menu-item">
            <RiContrastFill className="menu-icon" />
            <span onClick={toggleDarkMode}>
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
