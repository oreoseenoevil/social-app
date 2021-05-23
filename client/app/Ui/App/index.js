import React, { useContext } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'
import { LayoutContext } from '@Context/Layout'
import { Notification } from '@Components/Notifications'
import { useSelector } from 'react-redux'

const App = () => {
  const { active, toggleDarkMode } = useContext(LayoutContext)
  
  const { auth } = useSelector(state => state)

  return (
    <Router>
      <div className={`app ${active && 'dark'}`}>
        {auth.token && <Header active={active} toggleDarkMode={toggleDarkMode} />}
        <div className="main">
          <Notification />
          <Main />
        </div>
      </div>
    </Router>
  )
}

export default hot(module)(App)
