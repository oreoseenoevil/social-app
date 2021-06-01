import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import alert from '@Reducers/alert'
import profile from '@Reducers/profile'
import status from '@Reducers/status'
import posts from '@Reducers/post'
import modal from '@Reducers/modal'
import detailPost from '@Reducers/detailPost'
import discover from '@Reducers/discover'

export default combineReducers({
  auth,
  alert,
  profile,
  status,
  posts,
  modal,
  detailPost,
  discover
})
