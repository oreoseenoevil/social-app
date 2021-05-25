import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import '@Components/UserCard/index.scss'

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
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
        <span className="block-username">{user.username}</span>
        <span className="block-fullname">{user.fullname}</span>
      </div>
    </div>
  )
}
