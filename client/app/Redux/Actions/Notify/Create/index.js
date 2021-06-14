import { TYPES } from '@Actions'
import { postDataAPI } from '@Helpers'

const { ALERT } = TYPES

export const createNotify = ({ msg, auth, socket }) => async dispatch => {
  try {
    const res = await postDataAPI('/notify', msg, auth.token)

    socket.emit('createNotify', {
      ...res.data.data,
      user: {
        username: auth.user.username,
        avatar: auth.user.avatar
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
