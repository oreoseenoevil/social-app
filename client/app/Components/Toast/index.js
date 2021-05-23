import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import '@Components/Toast/index.scss'

export const Toast = ({ success, error, handleClose }) => {
  return (
    <div className="toast">
      <div className="toast-wrapper">
        {success && <FaCheckCircle className="toast-success" />}
        {error && <MdError className="toast-error" />}
        <div className="toast-message">
          {success && `${success}`}
          {error && `${error}`}
        </div>
        <span
          className="toast-close close"
          onClick={handleClose}
        ></span>
      </div>
    </div>
  )
}
