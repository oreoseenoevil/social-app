import { POST_TYPES } from '@Actions'
import { EditData, DeleteData } from '@Helpers'

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2
}

const { CREATE_POST, LOADING_POST, GET_POSTS, UPDATE_POST, DELETE_POST } =
  POST_TYPES

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
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
        result: action.payload.result,
        page: action.payload.page
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: DeleteData(state.posts, action.payload._id)
      }
    default:
      return state
  }
}

export default postReducer
