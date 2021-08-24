import React from 'react'
import '@Components/UserCard/index.scss'
import { Avatar } from '@Components/Avatar'
import { Link } from 'react-router-dom'

export const UserCard = ({
  user,
  children,
  handleClose,
  setShowFollowers,
  setShowFollowing
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowing) setShowFollowing(false)
    if (setShowFollowers) setShowFollowers(false)
  }

  return (
    <div className="user-card">
      <Link
        to={`/profile/${user._id}`}
        onClick={handleCloseAll}
        className="block-card"
      >
        <Avatar src={user.avatar} size="medium" />
        <div className="user-name">
          <span className="block-username">@{user.username}</span>
          <span className="block-fullname">{user.fullname}</span>
        </div>
      </Link>
      {children && <div className="block-child">{children}</div>}
    </div>
  )
}
