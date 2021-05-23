import React from 'react'
import { render } from 'react-dom'
import App from '@App'
import { LayoutContextProvider } from '@Context/Layout'
import DataProvider from '@Redux/store'

render(
  <DataProvider>
    <LayoutContextProvider>
      <App />
    </LayoutContextProvider>
  </DataProvider>,
  document.getElementById('root')
)
