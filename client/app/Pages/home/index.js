import React from 'react'
import '@Pages/home/index.scss'
import { Posts, Status } from '@Components/Home'

export default function Home() {
  return (
    <div className="homepage">
      <Status />
      <Posts />
    </div>
  )
}
