import { POST_TYPES, TYPES } from '@Actions'
import { deleteDataAPI } from '@Helpers'

const { DELETE_POST } = POST_TYPES
const { ALERT } = TYPES

export const deletePost = ({post, auth}) => async dispatch => {
  dispatch({
    type: DELETE_POST,
    payload: post
  })
  try {
    await deleteDataAPI(`/post/${post._id}`, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
