import { TYPES, POST_TYPES } from '@Actions'
import { patchDataAPI, EditData } from '@Helpers'

const { ALERT } = TYPES
const { UPDATE_POST } = POST_TYPES

export const likeComment = ({comment, post, auth, socket }) => async dispatch => {
  const newComment = {
    ...comment,
    likes: [...comment.likes, auth.user]
  }

  const newComments = EditData(post.comments, comment._id, newComment)

  const newPost = {
    ...post,
    comments: newComments
  }

  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  socket.emit('likeComment', newPost)

  try {
    await patchDataAPI(`/comments/${comment._id}/like`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
