import React from 'react'
import { UserCard } from '@Components/UserCard'
import { FollowButton } from '@Components/FollowButton'
import { useSelector } from 'react-redux'
import '@Components/Profile/Followers/index.scss'

export const Followers = ({ dark, user, setShowFollowers }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className="follow-container">
      <div className={`follow-content ${dark && 'dark'}`}>
        <div className={`group ${dark && 'dark'}`}>
          <h3>Followers</h3>
          <span
            className={`close x-marked ${dark && 'dark'}`}
            onClick={() => setShowFollowers(false)}
          ></span>
        </div>
        <div className="follow-display">
          {user.map(user => (
            <UserCard
              user={user}
              key={user._id}
              setShowFollowers={setShowFollowers}
            >
              {auth.user._id !== user._id && (
                <FollowButton dark={dark} user={user} />
              )}
            </UserCard>
          ))}
        </div>
      </div>
    </div>
  )
}
