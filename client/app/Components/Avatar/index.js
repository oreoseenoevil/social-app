import React, { Fragment } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import '@Components/Avatar/index.scss'

export const Avatar = ({ src, size, active }) => {
  return (
    <Fragment>
      {src === '' ? (
        <FaRegUserCircle className={`avatar ${size} ${active && 'active'}`} />
      ) : (
        <img
          src={src}
          alt="avatar"
          className={`avatar ${size} ${active && 'active'}`}
        />
      )}
    </Fragment>
  )
}
