import { TYPES } from '@Actions'
import { patchDataAPI } from '@Helpers'

const { ALERT, AUTH } = TYPES

export const unsavedPost = ({post, auth}) => async dispatch => {
  const newUser = {
    ...auth.user,
    saved: auth.user.saved.filter(id => id !== post._id)
  }
  dispatch({
    type: AUTH,
    payload: {
      ...auth, user: newUser
    }
  })

  try {
    await patchDataAPI(`/user/${post._id}/unsaved`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
