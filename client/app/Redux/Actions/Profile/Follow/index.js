import { TYPES, PROFILE_TYPES } from '@Actions'
import { patchDataAPI } from '@Helpers'

const { ALERT, AUTH } = TYPES

const { FOLLOW } = PROFILE_TYPES

export const followUser = ({ users, user, auth, socket}) => async dispatch => {
  let newUser
  if (users.every(item => item._id !== user._id)) {
    newUser = {
      ...user,
      followers: [...user.followers, auth.user]
    }
  } else {
    users.forEach(item => {
      if (item._id === user._id) {
        newUser = { ...item, followers: [...item.followers, auth.user]}
      }
    })
  }

  dispatch({
    type: FOLLOW,
    payload: newUser
  })

  dispatch({
    type: AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user, 
        following: [...auth.user.following, newUser]
      }
    }
  })

  try {
    const res = await patchDataAPI(`/user/${user._id}/follow`, null, auth.token)
    socket.emit('follow', res.data.data)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
