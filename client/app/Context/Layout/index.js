import React, { createContext, useEffect, useState } from 'react'

export const LayoutContext = createContext()

export const LayoutContextProvider = ({ children }) => {
  const [active, setActive] = useState(false)

  const darkMode = localStorage.getItem('dark')

  useEffect(() => {
    if (darkMode === 'enabled') {
      setActive(true)
    }
  }, [])

  const toggleDarkMode = () => {
    if (darkMode === 'enabled') {
      localStorage.setItem('dark', null)
      setActive(false)
    } else {
      localStorage.setItem('dark', 'enabled')
      setActive(true)
    }
  }

  return (
    <LayoutContext.Provider value={{
      active,
      toggleDarkMode
    }}>
      {children}
    </LayoutContext.Provider>
  )
}
