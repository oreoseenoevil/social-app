import { TYPES, PROFILE_TYPES } from '@Actions'

const { ALERT, AUTH } = TYPES

const { FOLLOW } = PROFILE_TYPES

export const followUser = ({ users, user, auth}) => async dispatch => {
  const newUser = {
    ...user,
    followers: [...user.followers, auth.user]
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
}
