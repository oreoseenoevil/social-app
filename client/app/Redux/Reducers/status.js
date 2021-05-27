import { TYPES } from '@Actions'

const { STATUS } = TYPES

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case STATUS:
      return action.payload
    default:
      return state
  }
}

export default statusReducer
