import React from 'react'
import '@Pages/profile/index.scss'
import { Info, Posts } from '@Components/Profile'

export default function Profile () {
  return (
    <div className="user-profile">
      <Info />
      <Posts />
    </div>
  )
}

