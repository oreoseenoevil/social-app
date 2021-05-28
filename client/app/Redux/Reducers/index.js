import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import alert from '@Reducers/alert'
import profile from '@Reducers/profile'
import status from '@Reducers/status'
import posts from '@Reducers/post'

export default combineReducers({
  auth,
  alert,
  profile,
  status,
  posts
})
