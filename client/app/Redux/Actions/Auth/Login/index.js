import { postDataAPI } from '@Helpers'
import { TYPES } from '@Actions'

const { AUTH, ALERT } = TYPES

export const login = data => async dispatch => {
  try {
    dispatch({
      type: ALERT,
      payload: { loading: true }
    })
    const res = await postDataAPI('/auth/login', data)

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
