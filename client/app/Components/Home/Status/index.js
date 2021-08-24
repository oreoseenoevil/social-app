import React, { useContext } from 'react'
import '@Components/Home/Status/index.scss'
import { Avatar } from '@Components/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { TYPES } from '@Actions'
import { LayoutContext } from '@Context/Layout'

export const Status = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const { STATUS } = TYPES
  const { dark } = useContext(LayoutContext)

  return (
    <div className={`status-container ${dark && 'dark'}`}>
      <Avatar src={auth.user.avatar} size="big" />
      <button
        className={`status-btn ${dark && 'dark'}`}
        onClick={() => dispatch({ type: STATUS, payload: true })}
      >
        @{auth.user.username}, What&apos;s on your mind?
      </button>
    </div>
  )
}
