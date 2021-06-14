import { NOTIFY_TYPES } from '@Actions'

const { CREATE_NOTIFY, REMOVE_NOTIFY, GET_NOTIFY } = NOTIFY_TYPES

const initialState = {
  loading: false,
  data: [],
  sound: false
}

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFY:
      return {
        ...state,
        data: action.payload
      }
    case CREATE_NOTIFY:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case REMOVE_NOTIFY:
      return {
        ...state,
        data: state.data.filter(item => (
          item.id !== action.payload.id || item.url !== action.payload.url
        ))
      }
    default:
      return state
  }
}

export default notifyReducer
