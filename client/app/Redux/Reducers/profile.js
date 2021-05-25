import { PROFILE_TYPES } from '@Actions/profile'

const { LOADING, GET_USER } = PROFILE_TYPES

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
        users: [...state.users, action.payload.user]
      }
    default:
      return state
  }
}

export default profileReducer
