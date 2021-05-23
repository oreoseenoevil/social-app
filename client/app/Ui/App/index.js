import React, { useContext } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import DataProvider from '@Redux/store'
import '@App/index.scss'
import { Header } from '@Layouts/Header'
import { Main } from '@Layouts/Main'
import { LayoutContext } from '@Context/Layout'
import { Notification } from '@Components/Notifications'

const App = () => {
  const { active, toggleDarkMode } = useContext(LayoutContext)

  return (
    <DataProvider>
      <Router>
        <div className={`app ${active && 'dark'}`}>
          <Header active={active} toggleDarkMode={toggleDarkMode} />
          <div className="main">
            <Notification />
            <Main />
          </div>
        </div>
      </Router>
    </DataProvider>
  )
}

export default hot(module)(App)
