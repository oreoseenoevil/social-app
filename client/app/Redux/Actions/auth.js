import { postDataAPI } from '@Helpers/fetchData'

export const TYPES = {
  AUTH: 'AUTH'
}

export const login = data => async dispatch => {
  try {
    dispatch({
      type: 'NOTIFY',
      payload: {loading: true}
    })
    const res = await postDataAPI('/auth/login', data)

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.data.access,
        user: res.data.data
      }
    })
    localStorage.setItem('mern_session', true)
    dispatch({
      type: 'NOTIFY',
      payload: {
        success: res.data.success
      }
    })
  } catch (error) {
    dispatch({
      type: 'NOTIFY',
      payload: {
        error: error.response.data.error
      }
    })
  }
}
