import React, { useContext } from 'react'
import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'
import { LayoutContext } from '@Context/Layout'
import { Notification } from '@Components/Notifications'
import { useSelector } from 'react-redux'
import { MobileMenu } from '@Components/Menu'
import { useComponentVisible } from '@Helpers'
import { StatusModal } from '@Components/Modal'

export const Layouts = () => {
  const { dark, toggleDarkMode } = useContext(LayoutContext)
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  
  const { auth, status } = useSelector(state => state)

  return (
    <div className={`app ${dark && 'dark'}`}>
      {auth.token && <Header
        dark={dark}
        toggleDarkMode={toggleDarkMode}
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
      />}
      {auth.token && <MobileMenu
        dark={dark}
        toggleDarkMode={toggleDarkMode}
        wrapperRef={ref}
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
      />}
      <div className="main">
        {status && <StatusModal dark={dark} />}
        <Notification />
        <Main />
      </div>
    </div>
  )
}
