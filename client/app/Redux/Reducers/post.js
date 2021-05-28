import { POST_TYPES } from '@Actions'

const initialState = {
  posts: []
}

const { CREATE_POST } = POST_TYPES

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    default:
      return state
  }
}

export default postReducer
