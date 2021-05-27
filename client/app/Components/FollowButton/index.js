import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unfollowUser } from '@Actions'
import '@Components/FollowButton/index.scss'

export const FollowButton = ({ user, dark }) => {
  const [followed, setFollowed] = useState(false)
  const [load, setLoad] = useState(false)

  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true)
    }
  }, [auth.user.following, user._id])

  const handleUnfollow = async () => {
    if (load) return
    setFollowed(false)
    setLoad(true)
    await dispatch(unfollowUser({users: profile.users, user, auth}))
    setLoad(false)
  }

  const handleFollow = async () => {
    if (load) return
    setFollowed(true)
    setLoad(true)
    await dispatch(followUser({users: profile.users, user, auth}))
    setLoad(false)
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