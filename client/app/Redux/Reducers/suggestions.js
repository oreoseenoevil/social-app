import { SUGGEST_TYPES } from '@Actions'

const { LOADING, GET_USERS } = SUGGEST_TYPES

const initialState = {
  loading: false,
  users: []
}

const suggestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload.data
      }
    default:
      return state
  }
}

export default suggestionsReducer
