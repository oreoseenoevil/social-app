import React, { useContext } from 'react'
import '@Utils/Page/index.scss'
import { useHistory } from 'react-router-dom'
import { VscArrowLeft } from 'react-icons/vsc'
import { LayoutContext } from '@Context/Layout'

export const PageNotFound = () => {
  const history = useHistory()
  const { dark } = useContext(LayoutContext)

  return (
    <div className="notfound">
      <h1>404 | Page not Found</h1>
      <p>This is not the page you&apos;re looking for.</p>
      <button
        className={`back ${dark && 'dark'}`}
        onClick={() => history.push('/')}
      >
        <VscArrowLeft className="arrow-left" />
        Go Back
      </button>
    </div>
  )
}
