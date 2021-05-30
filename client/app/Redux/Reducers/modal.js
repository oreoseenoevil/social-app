import { TYPES } from '@Actions'

const { MODAL } = TYPES

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case MODAL:
      return action.payload
    default:
      return state
  }
}

export default statusReducer
