import { POST_TYPES, TYPES, removeNotify } from '@Actions'
import { deleteDataAPI } from '@Helpers'

const { DELETE_POST } = POST_TYPES
const { ALERT } = TYPES

export const deletePost = ({ post, auth, socket }) => async dispatch => {
  dispatch({
    type: DELETE_POST,
    payload: post
  })
  try {
    const res = await deleteDataAPI(`/post/${post._id}`, auth.token)
    const msg = { 
      id: post._id,
      text: 'added a new post.',
      recipients: res.data.data.user.followers,
      url: `/post/${post._id}`
    }

    dispatch(removeNotify({ msg, auth, socket }))
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
