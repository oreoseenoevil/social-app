import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unfollowUser } from '@Actions'
import '@Components/FollowButton/index.scss'

export const FollowButton = ({ user, dark }) => {
  const [followed, setFollowed] = useState(false)
  const [load, setLoad] = useState(false)

  const { auth, profile, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user.following.find(item => item._id === user._id)) {
      setFollowed(true)
    }

    return () => setFollowed(false)
  }, [auth.user.following, user._id])

  const handleFollow = async () => {
    if (load) return
    setFollowed(!followed)
    setLoad(true)
    if (followed) {
      await dispatch(unfollowUser({ users: profile.users, user, auth, socket }))
    } else {
      await dispatch(followUser({ users: profile.users, user, auth, socket }))
    }
    setLoad(false)
  }

  return (
    <button
      className={`btn-info ${!followed && 'active'} ${dark && 'dark'}`}
      onClick={handleFollow}
    >
      {followed ? 'Following' : 'Follow'}
    </button>
  )
}
