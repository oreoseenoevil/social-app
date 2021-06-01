import { DISCOVER_TYPES } from '@Actions'

const { LOADING, GET_POSTS, UPDATE_POST } = DISCOVER_TYPES

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false
}

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        result: action.payload.result,
        firstLoad: true
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: action.payload.data,
        result: action.payload.result,
        page: state.page + 1
      }
    default:
      return state
  }
}

export default discoverReducer
