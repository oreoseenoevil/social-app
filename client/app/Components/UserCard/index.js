import React, { useContext } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import '@Components/UserCard/index.scss'
import { LayoutContext } from '@Context/Layout'

export const UserCard = ({ user }) => {
  const { active } = useContext(LayoutContext)

  return (
    <div className={`user-card ${active && 'dark'}`}>
      {
        user.avatar === '' ?
          <FaRegUserCircle className="avatar" /> :
          <img 
            src={user.avatar}
            alt="avatar"
            className="avatar image"
          />
      }
      <div className="user-name">
        <span className="block-username">@{user.username}</span>
        <span className="block-fullname">{user.fullname}</span>
      </div>
    </div>
  )
}
