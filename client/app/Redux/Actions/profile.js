import { TYPES } from '@Actions/global'
import { DeleteData, imageUpload, getDataAPI, putDataAPI } from '@Helpers'

const { ALERT, AUTH } = TYPES

export const PROFILE_TYPES = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW'
}

const { LOADING, GET_USER, FOLLOW, UNFOLLOW } = PROFILE_TYPES

export const getProfileUsers = ({ users, id, auth }) => async dispatch => {
  if (users.every(user => user._id !== id)) {
    try {
      dispatch({
        type: LOADING,
        payload: true
      })

      const res = await getDataAPI(`/user/${id}`, auth.token)

      dispatch({
        type: GET_USER,
        payload: res.data
      })

      dispatch({
        type: LOADING,
        payload: false
      })
    } catch (error) {
      dispatch({
        type: ALERT,
        payload: {
          error: error.response.data.error
        }
      })
    }
  }
}

export const updateProfileUser = ({ userData, avatar, auth }) => async dispatch => {
  try {
    let media
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    if (avatar) {
      media = await imageUpload([avatar])
    }
    const res = await putDataAPI(`/user/${userData._id}`, {
      ...userData,
      avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token)

    dispatch({
      type: AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar
        }
      }
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.message
      }
    })
  } catch (error) {
    dispatch({
      type: ALERT,
      payload: {
        error: error.response.data.error
      }
    })
  }
} 

export const followUser = ({ users, user, auth}) => async dispatch => {
  const newUser = {
    ...user,
    followers: [...user.followers, auth.user]
  }

  dispatch({
    type: FOLLOW,
    payload: newUser
  })

  dispatch({
    type: AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user, 
        following: [...auth.user.following, newUser]
      }
    }
  })
}

export const unfollowUser = ({ users, user, auth}) => async dispatch => {
  const newUser = {
    ...user,
    followers: DeleteData(user.followers, auth.user._id)
  }

  dispatch({
    type: UNFOLLOW,
    payload: newUser
  })

  dispatch({
    type: AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user, 
        following: DeleteData(auth.user.following, newUser._id)
      }
    }
  })
}
