import React from 'react'
import '@Pages/profile/index.scss'
import { Info, Posts } from '@Components/Profile'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function Profile () {
  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className="user-profile">
      <Info
        id={id}
        auth={auth}
        profile={profile}
        dispatch={dispatch}
      />
      <Posts />
    </div>
  )
}

