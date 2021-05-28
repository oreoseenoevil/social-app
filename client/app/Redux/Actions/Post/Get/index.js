import { TYPES, POST_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { LOADING_POST, GET_POSTS } = POST_TYPES
const { ALERT } = TYPES

export const getPosts = token => async dispatch => {
  try {
    dispatch({
      type: LOADING_POST,
      payload: true
    })
    const res = await getDataAPI('/posts', token)

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })

    dispatch({
      type: LOADING_POST,
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
