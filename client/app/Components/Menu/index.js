import React from 'react'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiArrowDropDownLine, RiContrastFill, RiLogoutBoxRLine } from 'react-icons/ri'
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

export const Menu = ({ toggleDarkMode, dark, mobileActive }) => {
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
    <ul className={`menu ${mobileActive && 'active'}`}>
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
