import { TYPES, POST_TYPES } from '@Actions'
import { patchDataAPI, DeleteData } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const unlikePost = ({post, auth, socket}) => async dispatch => {
  const newPost = {...post, likes: DeleteData(post.likes, auth.user._id)}
  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  socket.emit('unlikePost', newPost)

  try {
    await patchDataAPI(`/posts/${post._id}/unlike`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
