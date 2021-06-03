import React from 'react'
import '@Pages/home/index.scss'
import { Posts, Status, SideBar } from '@Components/Home'
import { Loading } from '@Components/Loading'
import { useSelector } from 'react-redux'

export default function Home() {

  const { posts } = useSelector(state => state)

  return (
    <div className="homepage">
      <div className="home-container">
        <div className="home-main">
          <Status />
          {
            posts.loading ?
              <Loading /> :
              posts.result === 0 ?
                <h2>No Posts</h2> :
                <Posts />
          }
        </div>
        <div className="home-sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  )
}
