import { TYPES } from '@Actions'
import { deleteDataAPI } from '@Helpers'

const { ALERT } = TYPES

export const removeNotify = ({ msg, auth, socket }) => async dispatch => {
  try {
    await deleteDataAPI(`/notify/${msg.id}?url=${msg.url}`, auth.token)

    socket.emit('removeNotify', msg)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
