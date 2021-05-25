import { TYPES } from '@Actions/global'
import { getDataAPI } from '@Helpers/fetchData'

const { ALERT } = TYPES

export const PROFILE_TYPES = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER'
}

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
