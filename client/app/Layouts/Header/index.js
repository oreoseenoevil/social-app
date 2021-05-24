import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiArrowDropDownLine } from 'react-icons/ri'
import { GiCaptainHatProfile } from 'react-icons/gi'
import { FaRegUserCircle } from 'react-icons/fa'
import '@Layouts/Header/index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@Actions/auth'
import { SearchBar } from '@Components/SearchBar'

export const Header = ({ active, toggleDarkMode }) => {

  const [dropdownOn, setDropdownOn] = useState(false)
  const { auth } = useSelector(state => state)
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

  const navLinks = [
    { label: 'Home', icon: RiHome2Line, path: '/' },
    { label: 'Messages', icon: RiMessageLine, path: '/messages' },
    { label: 'Discover', icon: RiCompassDiscoverLine, path: '/discover' },
    { label: 'Notifications', icon: RiNotification2Line, path: '/notifications' }
  ]

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const isActive = pn => {
    if (pn === pathname) {
      return 'active'
    }
  }

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
          <ul>
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
        </div>
      </div>
    </div>
  )
}
