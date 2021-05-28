import { TYPES, POST_TYPES } from '@Actions'
import { imageUpload, postDataAPI } from '@Helpers'

const { CREATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const createPost = ({ content, images, auth }) => async dispatch => {
  let media = []
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    if (images.length > 0) {
      media = await imageUpload(images)
    }

    const res = await postDataAPI('/posts', {
      content,
      images: media
    }, auth.token)

    dispatch({
      type: CREATE_POST,
      payload: res.data.data
    })

    dispatch({
      type: ALERT,
      payload: {
        loading: false
      }
    })
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
