import { TYPES, POST_TYPES } from '@Actions'
import { patchDataAPI, EditData } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const updateComment = ({ comment, post, content, auth }) => async dispatch => {
  const newComments = EditData(
    post.comments,
    comment._id,
    {...comment, content}
  )

  const newPost = {
    ...post,
    comments: newComments
  }

  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  try {
    await patchDataAPI(`/comments/${comment._id}`, {
      content
    }, auth.token )
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
