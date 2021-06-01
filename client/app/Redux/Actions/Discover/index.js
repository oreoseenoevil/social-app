import { TYPES, DISCOVER_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { ALERT } = TYPES

const { LOADING, GET_POSTS } = DISCOVER_TYPES 

export const getDiscoverPosts = token => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    })

    const res = await getDataAPI('/posts/discover', token)

    dispatch({
      type: GET_POSTS,
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
