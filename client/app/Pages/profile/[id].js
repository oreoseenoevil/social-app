import React, { useEffect, useState } from 'react'
import '@Pages/profile/index.scss'
import { Info, Navigation } from '@Components/Profile'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegBookmark } from 'react-icons/fa'
import { VscLoading } from 'react-icons/vsc'
import { BsGrid3X3 } from 'react-icons/bs'
import { getProfileUsers } from '@Actions'

export default function Profile() {
  const [tab, setTab] = useState('posts')
  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div className="user-profile">
      <Info id={id} auth={auth} profile={profile} dispatch={dispatch} />
      {auth.user._id === id && (
        <div className="profile-tab">
          <span
            className={`button-tab ${tab === 'posts' && 'active'}`}
            onClick={() => setTab('posts')}
          >
            <BsGrid3X3 /> Posts
          </span>
          <span
            className={`button-tab ${tab === 'saved' && 'active'}`}
            onClick={() => setTab('saved')}
          >
            <FaRegBookmark /> Saved
          </span>
        </div>
      )}
      {profile.loading ? (
        <VscLoading size="3em" className="loading-profile" />
      ) : (
        <Navigation
          tab={tab}
          id={id}
          auth={auth}
          profile={profile}
          dispatch={dispatch}
        />
      )}
    </div>
  )
}
