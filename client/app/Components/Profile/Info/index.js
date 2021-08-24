import React, { useState, useEffect, useContext } from 'react'
import { Avatar } from '@Components/Avatar'
import '@Components/Profile/Info/index.scss'
import { LayoutContext } from '@Context/Layout'
import { TYPES } from '@Actions'
import { Edit, Followers, Following } from '@Components/Profile'
import { FollowButton } from '@Components/FollowButton'

export const Info = ({ id, auth, profile, dispatch }) => {
  const { dark } = useContext(LayoutContext)

  const { MODAL } = TYPES
  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, profile.users, dispatch])

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: MODAL, payload: true })
    } else {
      dispatch({ type: MODAL, payload: false })
    }
  }, [showFollowers, showFollowing, onEdit, dispatch])

  return (
    <div className={`user-info ${dark && 'dark'}`}>
      {userData.map(user => (
        <div className="info-container" key={user._id}>
          <div className="user-photo">
            <Avatar src={user.avatar} size="large" />
          </div>
          <div className="info-content">
            <div className="info-title">
              <h2>{user.username}</h2>
              <div className="group-button">
                {user._id === auth.user._id ? (
                  <button
                    className={`btn-edit ${dark && 'dark'}`}
                    onClick={() => setOnEdit(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <FollowButton user={user} dark={dark} />
                )}
              </div>
            </div>
            <h6>{user.fullname}</h6>
            <p>{user.address}</p>
            <h6>
              {user.email} {user.mobile && `| ${user.mobile}`}
            </h6>
            <a href={user.website} target="_blank" rel="noopener noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
            <div className="info-group">
              <span onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>
          </div>
          {onEdit && <Edit setOnEdit={setOnEdit} />}
          {showFollowers && (
            <Followers
              dark={dark}
              user={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              dark={dark}
              user={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  )
}
