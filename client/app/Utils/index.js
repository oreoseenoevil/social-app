import React from 'react'
import '@Utils/index.scss'

export const PageNotFound = () => {
  return (
    <div className="notfound">
      <h1>404 | Page not Found</h1>
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
