import { TYPES, PROFILE_TYPES } from '@Actions'
import { DeleteData } from '@Helpers'

const { ALERT, AUTH } = TYPES
const { UNFOLLOW } = PROFILE_TYPES

export const unfollowUser = ({ users, user, auth}) => async dispatch => {
  const newUser = {
    ...user,
    followers: DeleteData(user.followers, auth.user._id)
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
}
