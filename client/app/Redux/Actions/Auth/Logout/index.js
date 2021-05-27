import { postDataAPI } from '@Helpers'
import { TYPES } from '@Actions'

const { ALERT } = TYPES

export const logout = () => async dispatch => {
  try {
    localStorage.removeItem('mern_session')
    await postDataAPI('/auth/logout')
    window.location.href = '/'
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
