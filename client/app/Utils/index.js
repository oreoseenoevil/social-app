import React from 'react'
import '@Utils/index.scss'
import { useHistory } from 'react-router-dom'
import { VscArrowLeft } from 'react-icons/vsc'

export const PageNotFound = () => {
  const history = useHistory()

  return (
    <div className="notfound">
      <h1>404 | Page not Found</h1>
      <p>This is not the page you&apos;re looking for.</p>
      <button className="back" onClick={() => history.push('/')}>
        <VscArrowLeft className="arrow-left" />
        Go Back
      </button>
    </div>
  )
}

export const validate = ({password, confirmPassword}) => {
  const error = {}

  if (password !== confirmPassword) {
    error.error = 'Password didn\'t match.'
  }

  return {
    message: error,
    errorLength: Object.keys(error).length
  }
}
