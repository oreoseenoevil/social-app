import React, { createContext, useEffect, useState } from 'react'

export const LayoutContext = createContext()

export const LayoutContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const darkMode = localStorage.getItem('dark')

  useEffect(() => {
    if (darkMode === 'enabled') {
      setDark(true)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode === 'enabled') {
      localStorage.setItem('dark', null)
      setDark(false)
    } else {
      localStorage.setItem('dark', 'enabled')
      setDark(true)
    }
  }

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <LayoutContext.Provider value={{
      dark,
      toggleDarkMode,
      openMenu,
      toggleMenu
    }}>
      {children}
    </LayoutContext.Provider>
  )
}
