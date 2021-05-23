import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import alert from '@Reducers/alert'

export default combineReducers({
  auth,
  alert
})
