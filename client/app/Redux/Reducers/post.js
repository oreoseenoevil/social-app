import { POST_TYPES } from '@Actions'

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
}

const { CREATE_POST, LOADING_POST, GET_POSTS } = POST_TYPES

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case LOADING_POST:
      return {
        ...state,
        loading: action.payload
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        result: action.payload.result
      }
    default:
      return state
  }
}

export default postReducer
