import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { POST_TYPES, TYPES } from '@Actions'
import { useSocketPost, useSocketFollow } from '@Helpers'

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state)
  
  const { UPDATE_POST } = POST_TYPES
  const { AUTH } = TYPES

  // Connect
  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  // Likes
  useSocketPost('likeToClient', UPDATE_POST)
  useSocketPost('unlikeToClient', UPDATE_POST)

  // Comments
  useSocketPost('createCommentToClient', UPDATE_POST)
  useSocketPost('deleteCommentToClient', UPDATE_POST)
  useSocketPost('likeCommentToClient', UPDATE_POST)
  useSocketPost('unlikeCommentToClient', UPDATE_POST)

  // Follow and Unfollow
  useSocketFollow('followToClient', AUTH)
  useSocketFollow('unfollowToClient', AUTH)

  return (
    <></>
  )
}

export default SocketClient
