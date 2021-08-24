import React, { useContext } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdError } from 'react-icons/md'
import '@Components/Toast/index.scss'
import { LayoutContext } from '@Context/Layout'

export const Toast = ({ success, error, handleClose }) => {
  const { dark } = useContext(LayoutContext)

  return (
    <div className={`toast ${dark && 'dark'}`}>
      <div className="toast-wrapper">
        {success && <FaCheckCircle className="toast-success" />}
        {error && <MdError className="toast-error" />}
        <div className="toast-message">
          {success && `${success}`}
          {error && `${error}`}
        </div>
        <span className="toast-close close" onClick={handleClose}></span>
      </div>
    </div>
  )
}
