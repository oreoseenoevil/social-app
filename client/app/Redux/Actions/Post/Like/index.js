import { TYPES, POST_TYPES } from '@Actions'
import { patchDataAPI } from '@Helpers'

const { ALERT } = TYPES
const { UPDATE_POST } = POST_TYPES

export const likePost = ({post, auth, socket}) => async dispatch => {
  const newPost = {...post, likes: [...post.likes, auth.user]}
  dispatch({
    type: UPDATE_POST,
    payload: newPost
  })

  socket.emit('likePost', newPost)

  try {
    await patchDataAPI(`/posts/${post._id}/like`, null, auth.token)
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
