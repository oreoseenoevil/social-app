import React, { useContext } from 'react'
import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'
import { LayoutContext } from '@Context/Layout'
import { Notification } from '@Components/Notifications'
import { useSelector } from 'react-redux'
import { MobileMenu } from '@Components/Menu'

export const Layouts = () => {
  const { active, toggleDarkMode, openMenu, toggleMenu } = useContext(LayoutContext)
  
  const { auth } = useSelector(state => state)

  return (
    <div className={`app ${active && 'dark'}`}>
      {auth.token && <Header active={active} toggleDarkMode={toggleDarkMode} />}
      <MobileMenu
        active={openMenu}
        toggleDarkMode={toggleDarkMode}
        toggleMenu={toggleMenu}
      />
      <div className="main">
        <Notification />
        <Main />
      </div>
    </div>
  )
}
