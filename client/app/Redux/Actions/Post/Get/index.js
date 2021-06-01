import { TYPES, POST_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { LOADING_POST, GET_POSTS, GET_POST } = POST_TYPES
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
      payload: { ...res.data, page: 2 }
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

export const getPost = ({detailPost, id, auth}) => async dispatch => {
  if (detailPost.every(post => post._id !== id)) {
    try {
      const res = await getDataAPI(`/post/${id}`, auth.token)
  
      dispatch({
        type: GET_POST,
        payload: res.data.data
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
