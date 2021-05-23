import { postDataAPI, getDataAPI } from '@Helpers/fetchData'
import { TYPES } from '@Actions/global'
import { validate } from '@Utils'

const { AUTH, ALERT } = TYPES

export const login = data => async dispatch => {
  try {
    dispatch({
      type: ALERT,
      payload: {loading: true}
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
      payload: {loading: true}
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
