import { TYPES, SUGGEST_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { LOADING, GET_USERS } = SUGGEST_TYPES
const { ALERT } = TYPES

export const getSuggestions = token => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    })
    const res = await getDataAPI('/userSuggestion', token)
    dispatch({
      type: GET_USERS,
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
