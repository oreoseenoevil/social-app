import { TYPES, PROFILE_TYPES } from '@Actions'
import { DeleteData, patchDataAPI } from '@Helpers'

const { ALERT, AUTH } = TYPES
const { UNFOLLOW } = PROFILE_TYPES

export const unfollowUser = ({ users, user, auth, socket}) => async dispatch => {
  let newUser
  if (users.every(item => item._id !== user._id)) {
    newUser = {
      ...user,
      followers: DeleteData(user.followers, auth.user._id)
    }
  } else {
    users.forEach(item => {
      if (item._id === user._id) {
        newUser = {
          ...item,
          followers: DeleteData(item.followers, auth.user._id)
        }
      }
    })
  }

  dispatch({
    type: UNFOLLOW,
    payload: newUser
  })

  dispatch({
    type: AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user, 
        following: DeleteData(auth.user.following, newUser._id)
      }
    }
  })

  try {
    const res = await patchDataAPI(`/user/${user._id}/unfollow`, null, auth.token)
    socket.emit('unfollow', res.data.data)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
