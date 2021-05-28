import { TYPES, POST_TYPES } from '@Actions'
import { imageUpload, putDataAPI } from '@Helpers'

const { UPDATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const updatePost = ({ content, images, auth, status }) => async dispatch => {
  let media = []
  const imgNewUrl = images.filter(img => !img.url)
  const imgOldUrl = images.filter(img => img.url)

  if (status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length) {
    return
  }
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    if (imgNewUrl.length > 0) {
      media = await imageUpload(imgNewUrl)
    }

    const res = await putDataAPI(`/posts/${status._id}`, {
      content,
      images: [...imgOldUrl, ...media]
    }, auth.token)

    dispatch({
      type: UPDATE_POST,
      payload: res.data.data
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.message
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
