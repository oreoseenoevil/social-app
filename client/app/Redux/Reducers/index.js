import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import notify from '@Reducers/notify'

export default combineReducers({
  auth,
  notify
})
