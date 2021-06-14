import { TYPES, NOTIFY_TYPES } from '@Actions'
import { patchDataAPI } from '@Helpers'

const { ALERT } = TYPES
const { UPDATE_NOTIFY } = NOTIFY_TYPES

export const isReadNotify = ({ data, auth }) => async dispatch => {
  dispatch({
    type: UPDATE_NOTIFY,
    payload: {...data, isRead: true}
  })
  try {
    await patchDataAPI(`/notify/${data._id}`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
