import { TYPES, POST_TYPES } from '@Actions'
import { patchDataAPI, EditData, DeleteData } from '@Helpers'

const { ALERT } = TYPES
const { UPDATE_POST } = POST_TYPES

export const unlikeComment = ({comment, post, auth, socket }) => async dispatch => {
  const newComment = {
    ...comment,
    likes: DeleteData(comment.likes, auth.user._id)
  }

  const newComments = EditData(post.comments, comment._id, newComment)

  const newPost = {...post, comments: newComments}

  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  socket.emit('unlikeComment', newPost)

  try {
    await patchDataAPI(`/comments/${comment._id}/unlike`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
