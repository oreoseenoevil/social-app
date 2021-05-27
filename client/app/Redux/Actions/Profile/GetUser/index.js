import { TYPES, PROFILE_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { ALERT } = TYPES


const { LOADING, GET_USER } = PROFILE_TYPES

export const getProfileUsers = ({ users, id, auth }) => async dispatch => {
  if (users.every(user => user._id !== id)) {
    try {
      dispatch({
        type: LOADING,
        payload: true
      })

      const res = await getDataAPI(`/user/${id}`, auth.token)

      dispatch({
        type: GET_USER,
        payload: res.data
      })

      dispatch({
        type: LOADING,
        payload: false
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
}
