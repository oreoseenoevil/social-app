import React from 'react'
import '@Pages/home/index.scss'
import { Posts, Status, SideBar } from '@Components/Home'
import { VscLoading } from 'react-icons/vsc'
import { useSelector } from 'react-redux'

export default function Home() {
  const { posts } = useSelector(state => state)

  return (
    <div className="homepage">
      <div className="home-container">
        <div className="home-main">
          <Status />
          {posts.loading ? (
            <VscLoading size="3em" className="loading-profile" />
          ) : posts.result === 0 && posts.posts.length ? (
            <h2>No Posts</h2>
          ) : (
            <Posts />
          )}
        </div>
        <div className="home-sidebar">
          <SideBar />
        </div>
      </div>
    </div>
  )
}
