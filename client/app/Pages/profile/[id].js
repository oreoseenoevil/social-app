import React, { useEffect } from 'react'
import '@Pages/profile/index.scss'
import { Info, Posts } from '@Components/Profile'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { VscLoading } from 'react-icons/vsc'
import { getProfileUsers } from '@Actions'

export default function Profile () {
  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({id, auth}))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div className="user-profile">
      <Info
        id={id}
        auth={auth}
        profile={profile}
        dispatch={dispatch}
      />
      {
        profile.loading ?
          <VscLoading size="3em" className="loading-profile" /> :
          <Posts
            id={id}
            auth={auth}
            profile={profile}
            dispatch={dispatch}
          />
      }
    </div>
  )
}
