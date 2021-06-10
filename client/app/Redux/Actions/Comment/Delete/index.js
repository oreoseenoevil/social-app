import { TYPES, POST_TYPES } from '@Actions'
import { deleteDataAPI } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const deleteComment = ({ comment, post, auth, socket }) => async dispatch => {
  const deleteArr = [...post.comments.filter(
    item => item.reply === comment._id
  ), comment]

  const newPost = {
    ...post,
    comments: post.comments.filter(item => !deleteArr.find(data => item._id === data._id))
  }

  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  socket.emit('deleteComment', newPost)

  try {
    deleteArr.forEach(item => deleteDataAPI(`/comments/${item._id}`, auth.token))
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
