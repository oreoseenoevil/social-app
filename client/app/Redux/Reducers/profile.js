import { PROFILE_TYPES } from '@Actions'
import { EditData } from '@Helpers'

const { LOADING, GET_USER, FOLLOW, UNFOLLOW, GET_ID, GET_POSTS, UPDATE_POST } =
  PROFILE_TYPES

const initialState = {
  ids: [],
  loading: false,
  users: [],
  posts: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.data]
      }
    case FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      }
    case UNFOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload)
      }
    case GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload]
      }
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload)
      }
    default:
      return state
  }
}

export default profileReducer
