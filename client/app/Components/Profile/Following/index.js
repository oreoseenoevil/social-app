import React from 'react'
import { UserCard } from '@Components/UserCard'
import { FollowButton } from '@Components/FollowButton'
import { useSelector } from 'react-redux'
import '@Components/Profile/Followers/index.scss'

export const Following = ({ dark, user, setShowFollowing }) => {
  const { auth } = useSelector(state => state)

  return (
    <div className="follow-container">
      <div className={`follow-content ${dark && 'dark'}`}>
        <div className={`group ${dark && 'dark'}`}>
          <h3>Following</h3>
          <span
            className={`close x-marked ${dark && 'dark'}`}
            onClick={() => setShowFollowing(false)}
          ></span>
        </div>
        <div className="follow-display">
          {user.map(user => (
            <UserCard
              user={user}
              key={user._id}
              setShowFollowing={setShowFollowing}
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
