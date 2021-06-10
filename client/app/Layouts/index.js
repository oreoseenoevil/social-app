import React, { useContext } from 'react'
import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'
import { LayoutContext } from '@Context/Layout'
import { Notification } from '@Components/Notifications'
import { useSelector } from 'react-redux'
import { StatusModal } from '@Components/Modal'
import SocketClient from '@Socket'

export const Layouts = () => {
  const { dark, toggleDarkMode } = useContext(LayoutContext)

  const { auth, status, modal } = useSelector(state => state)

  return (
    <div className={`app ${dark && 'dark'} ${(status || modal) && 'modal-active'}`}>
      {auth.token && <Header
        dark={dark}
        toggleDarkMode={toggleDarkMode}
      />}
      <div className={`main ${dark && 'dark'}`}>
        {status && <StatusModal dark={dark} />}
        {auth.token && <SocketClient />}
        <Notification />
        <Main />
      </div>
    </div>
  )
}
