import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from '@Components/Avatar'
import '@Components/Info/index.scss'
import { LayoutContext } from '@Context/Layout'
import { getProfileUsers } from '@Actions/profile'

export const Info = () => {
  const { active } = useContext(LayoutContext)
  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState([])

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
    <div className={`user-info ${active && 'dark'}`}>
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
                  <button className={`btn-info ${active && 'dark'}`}>
                    Edit Profile
                  </button>
                </div>
              </div>
              <h6>{user.fullname}</h6>
              <p>{user.address}</p>
              <h6>{user.email}</h6>
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
              <div className="info-group">
                <span>{user.followers.length} Followers</span>
                <span>{user.following.length} Following</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
