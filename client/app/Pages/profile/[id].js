import React from 'react'
import '@Pages/profile/index.scss'
import { Info } from '@Components/Info'
import { Posts } from '@Components/Posts'

export default function Profile () {
  return (
    <div className="user-profile">
      <Info />
      <Posts />
    </div>
  )
}

