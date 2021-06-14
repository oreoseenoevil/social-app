import { TYPES, POST_TYPES, createNotify } from '@Actions'
import { imageUpload, postDataAPI } from '@Helpers'

const { CREATE_POST } = POST_TYPES
const { ALERT } = TYPES

export const createPost = ({ content, images, auth, socket }) => async dispatch => {
  let media = []
  try {
    if (images.length > 0) {
      media = await imageUpload(images)
    }

    const res = await postDataAPI('/posts', {
      content,
      images: media
    }, auth.token)

    dispatch({
      type: CREATE_POST,
      payload: {...res.data.data, user: auth.user}
    })

    const msg = {
      id: res.data.data._id,
      text: 'added a new post.',
      recipients: res.data.data.user.followers,
      url: `/post/${res.data.data._id}`,
      content,
      image: media[0].url
    }

    dispatch(createNotify({ msg, auth, socket }))
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
}
