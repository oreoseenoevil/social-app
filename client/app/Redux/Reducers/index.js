import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import alert from '@Reducers/alert'
import profile from '@Reducers/profile'

export default combineReducers({
  auth,
  alert,
  profile
})
