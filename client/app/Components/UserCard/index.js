import React, { useContext } from 'react'
import '@Components/UserCard/index.scss'
import { LayoutContext } from '@Context/Layout'
import { Avatar } from '@Components/Avatar'

export const UserCard = ({ user }) => {
  const { active } = useContext(LayoutContext)

  return (
    <div className={`user-card ${active && 'dark'}`}>
      <Avatar src={user.avatar} size="medium" />
      <div className="user-name">
        <span className="block-username">@{user.username}</span>
        <span className="block-fullname">{user.fullname}</span>
      </div>
    </div>
  )
}
