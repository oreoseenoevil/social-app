import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'

const App = () => {
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
    <Router>
      <div className={`app ${active && 'dark'}`}>
        <Header active={active} toggleDarkMode={toggleDarkMode} />
        <div className="main">
          <Main />
        </div>
      </div>
    </Router>
  )
}

export default hot(module)(App)
