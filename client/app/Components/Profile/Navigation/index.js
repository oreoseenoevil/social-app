import React from 'react'
import { Posts, SavedPosts } from '@Components/Profile'

export const Navigation = ({ tab, id, auth, profile, dispatch }) => {
  switch (tab) {
    case 'posts':
      return <Posts id={id} auth={auth} profile={profile} dispatch={dispatch} />
    case 'saved':
      return <SavedPosts auth={auth} dispatch={dispatch} />
  }
}
