import { TYPES } from '@Actions'
import { imageUpload, putDataAPI } from '@Helpers'

const { ALERT, AUTH } = TYPES

export const updateProfileUser = ({ userData, avatar, auth }) => async dispatch => {
  try {
    let media
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    if (avatar) {
      media = await imageUpload([avatar])
    }
    const res = await putDataAPI(`/user/${userData._id}`, {
      ...userData,
      avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token)

    dispatch({
      type: AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar
        }
      }
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
