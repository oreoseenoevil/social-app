import { combineReducers } from 'redux'
import auth from '@Reducers/auth'
import alert from '@Reducers/alert'
import profile from '@Reducers/profile'
import status from '@Reducers/status'
import posts from '@Reducers/post'
import modal from '@Reducers/modal'
import detailPost from '@Reducers/detailPost'
import discover from '@Reducers/discover'
import suggestions from '@Reducers/suggestions'
import socket from '@Reducers/socket'
import notify from '@Reducers/notify'

export default combineReducers({
  auth,
  alert,
  profile,
  status,
  posts,
  modal,
  detailPost,
  discover,
  suggestions,
  socket,
  notify
})
