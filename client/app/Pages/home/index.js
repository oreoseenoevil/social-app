import React from 'react'
import '@Pages/home/index.scss'
import { Posts, Status } from '@Components/Home'
import { Loading } from '@Components/Loading'
import { useSelector } from 'react-redux'

export default function Home() {

  const { posts } = useSelector(state => state)

  return (
    <div className="homepage">
      <Status />
      {
        posts.loading ?
          <Loading /> :
          posts.result === 0 ?
            <h2>No Posts</h2> :
            <Posts />
      }
    </div>
  )
}
