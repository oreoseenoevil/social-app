import { TYPES, POST_TYPES } from '@Actions'
import { postDataAPI } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const createComment = ({ post, newComment, auth }) => async dispatch => {
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
    await postDataAPI('/comments', data, auth.token)

  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
