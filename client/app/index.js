import React from 'react'
import { render } from 'react-dom'
import App from '@App'
import { LayoutContextProvider } from '@Context/Layout'

render(
  <LayoutContextProvider>
    <App />
  </LayoutContextProvider>,
  document.getElementById('root')
)
