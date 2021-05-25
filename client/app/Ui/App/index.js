import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import '@App/index.scss'
import { Layouts } from '@Layouts'
import { LayoutContextProvider } from '@Context/Layout'
import DataProvider from '@Redux/store'

const App = () => {

  return (
    <DataProvider>
      <LayoutContextProvider>
        <Router>
          <Layouts />
        </Router>
      </LayoutContextProvider>
    </DataProvider>
  )
}

export default hot(module)(App)
