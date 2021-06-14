import React from 'react'
import { RiMessageLine, RiHome2Line, RiNotification2Line, RiCompassDiscoverLine, RiContrastFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { Avatar } from '@Components/Avatar'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '@Components/Menu/index.scss'
import { useComponentVisible } from '@Helpers'

import { logout } from '@Actions'
import { NotifyModal } from '@Components/Modal'

const navLinks = [
  { label: 'Home', icon: RiHome2Line, path: '/' },
  { label: 'Messages', icon: RiMessageLine, path: '/messages' },
  { label: 'Discover', icon: RiCompassDiscoverLine, path: '/discover' }
]

export const Menu = ({ toggleDarkMode, dark, mobileActive }) => {
  const { auth } = useSelector(state => state)

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const {
    ref: notifyRef,
    isComponentVisible: dropDown,
    setIsComponentVisible: setDropDown } = useComponentVisible(false)

  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const history = useHistory()

  const isActive = pn => {
    if (pn === pathname) {
      return 'active'
    }
  }

  return (
    <ul className={`menu ${mobileActive && 'active'} ${dark && 'dark'}`}>
      {
        navLinks.map((link, index) => (
          <li key={index}>
            <Link className={`nav-link ${isActive(link.path)}`} to={link.path}>
              <link.icon />
            </Link>
          </li>
        ))
      }
      <li
        className="other-menu"
        ref={notifyRef}
        onClick={() => setDropDown(!dropDown)}
      >
        <a className={`${dropDown && 'active'}`}>
          <RiNotification2Line size="1.6em" />
        </a>
        {
          dropDown &&
            <div className={`dropdown-menu notification ${dark && 'dark'}`}>
              <NotifyModal />
            </div>
        }
      </li>
      <li className="other-menu"
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <a>
          <Avatar src={auth.user.avatar} size="small" active={isComponentVisible} />
        </a>
        { isComponentVisible &&
            <div className={`dropdown-menu user ${dark && 'dark'}`}>
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
