import { POST_TYPES } from '@Actions'

const { GET_POST } = POST_TYPES

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POST:
      return [...state, action.payload]
    default:
      return state
  }
}

export default detailPostReducer
