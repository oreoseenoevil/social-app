import React, { useState, useEffect, useContext } from 'react'
import { Avatar } from '@Components/Avatar'
import '@Components/Profile/Info/index.scss'
import { LayoutContext } from '@Context/Layout'
import { getProfileUsers } from '@Actions'
import { Edit } from '@Components/Profile'
import { FollowButton } from '@Components/FollowButton'

export const Info = ({id, auth, profile, dispatch}) => {
  const { dark } = useContext(LayoutContext)

  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({users: profile.users, id, auth}))
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, profile.users])

  return (
    <div className={`user-info ${dark && 'dark'}`}>
      {
        userData.map(user => (
          <div className="info-container" key={user._id}>
            <div className="user-photo">
              <Avatar src={user.avatar} size="large" />
            </div>
            <div className="info-content">
              <div className="info-title">
                <h2>{user.username}</h2>
                <div className="group-button">
                  {
                    user._id === auth.user._id ?
                      <button
                        className={`btn-edit ${dark && 'dark'}`}
                        onClick={() => setOnEdit(true)}
                      >
                        Edit Profile
                      </button> :
                      <FollowButton user={user} dark={dark} />
                  }
                </div>
              </div>
              <h6>{user.fullname}</h6>
              <p>{user.address}</p>
              <h6>{user.email} {user.mobile && `| ${user.mobile}`}</h6>
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
              <p>{user.story}</p>
              <div className="info-group">
                <span>{user.followers.length} Followers</span>
                <span>{user.following.length} Following</span>
              </div>
            </div>
            {onEdit && <Edit setOnEdit={setOnEdit} />}
          </div>
        ))
      }
    </div>
  )
}
