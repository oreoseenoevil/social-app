import { POST_TYPES } from '@Actions'
import { EditData } from '@Helpers'

const { GET_POST, UPDATE_POST } = POST_TYPES

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POST:
      return [...state, action.payload]
    case UPDATE_POST:
      return EditData(state, action.payload._id, action.payload)
    default:
      return state
  }
}

export default detailPostReducer
