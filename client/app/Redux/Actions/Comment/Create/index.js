import { TYPES, POST_TYPES } from '@Actions'
import { postDataAPI } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const createComment = ({ post, newComment, auth, socket }) => async dispatch => {
  const newPost = {
    ...post,
    comments: [...post.comments, newComment]
  }

  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  try {
    const data = {
      ...newComment,
      postId: post._id,
      postUserId: post.user._id
    }
    const res = await postDataAPI('/comments', data, auth.token)

    const newData = {...res.data.data, user: auth.user}
    const newPost = {...post, comments: [...post.comments, newData]}
    dispatch({
      type: UPDATE_POST,
      payload: newPost
    })

    socket.emit('createComment', newPost)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
