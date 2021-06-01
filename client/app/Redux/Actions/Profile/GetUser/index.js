import { TYPES, PROFILE_TYPES } from '@Actions'
import { getDataAPI } from '@Helpers'

const { ALERT } = TYPES


const { LOADING, GET_USER, GET_ID, GET_POSTS } = PROFILE_TYPES

export const getProfileUsers = ({ id, auth }) => async dispatch => {
  dispatch({
    type: GET_ID,
    payload: id
  })
  try {
    dispatch({
      type: LOADING,
      payload: true
    })

    const users = await getDataAPI(`/user/${id}`, auth.token)
    const posts = await getDataAPI(`/user/posts/${id}`, auth.token)

    dispatch({
      type: GET_USER,
      payload: users.data
    })

    dispatch({
      type: GET_POSTS,
      payload: { ...posts.data, _id: id, page: 2 }
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
