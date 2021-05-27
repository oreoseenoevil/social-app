import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unfollowUser } from '@Actions'

export const FollowButton = ({ user, dark }) => {
  const [followed, setFollowed] = useState(false)

  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true)
    }
  }, [auth.user.following, user._id])

  const handleUnfollow = () => {
    setFollowed(false)
    dispatch(unfollowUser({users: profile.users, user, auth}))
  }

  const handleFollow = () => {
    setFollowed(true)
    dispatch(followUser({users: profile.users, user, auth}))
  }

  return (
    <button
      className={`btn-info ${!followed && 'active'} ${dark && 'dark'}`}
      onClick={followed ? handleUnfollow : handleFollow}
    >
      {followed ? 'Following' : 'Follow'}
    </button>
  )
}
