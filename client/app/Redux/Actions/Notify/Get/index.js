import { TYPES, NOTIFY_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { ALERT } = TYPES
const { GET_NOTIFY } = NOTIFY_TYPES

export const getNotify = token => async dispatch => {
  try {
    const res = await getDataAPI('/notify', token)

    dispatch({
      type: GET_NOTIFY,
      payload: res.data.data
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
