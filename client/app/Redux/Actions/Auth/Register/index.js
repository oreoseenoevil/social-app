import { postDataAPI } from '@Helpers'
import { TYPES } from '@Actions'
import { validate } from '@Utils'

const { AUTH, ALERT } = TYPES

export const register = data => async dispatch => {
  const check = validate(data)
  if (check.errorLength > 0) {
    return dispatch({
      type: ALERT,
      payload: check.message
    })
  }

  try {
    dispatch({
      type: ALERT,
      payload: { loading: true }
    })

    const res = await postDataAPI('/auth/register', data)
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access,
        user: res.data.data
      }
    })

    localStorage.setItem('mern_session', true)
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
