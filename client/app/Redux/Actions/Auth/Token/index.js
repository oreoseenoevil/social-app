import { getDataAPI } from '@Helpers'
import { TYPES } from '@Actions'

const { AUTH, ALERT } = TYPES

export const refreshToken = () => async dispatch => {
  const session = localStorage.getItem('mern_session')

  if (session) {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    try {
      const res = await getDataAPI('/auth/token')
      dispatch({
        type: AUTH,
        payload: {
          token: res.data.access,
          user: res.data.data
        }
      })

      dispatch({
        type: ALERT,
        payload: {}
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
