import { PROFILE_TYPES } from '@Actions/profile'
import { EditData } from '@Helpers'

const { LOADING, GET_USER, FOLLOW, UNFOLLOW } = PROFILE_TYPES

const initialState = {
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
    default:
      return state
  }
}

export default profileReducer
