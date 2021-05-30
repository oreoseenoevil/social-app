import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { PostCard } from '@Components/Home'
import { LayoutContext } from '@Context/Layout'
import '@Components/Home/Posts/index.scss'

export const Posts = () => {
  const { dark } = useContext(LayoutContext)
  const { posts } = useSelector(state => state)

  return (
    <div className="posts-container">
      {
        posts.posts.map(post => (
          <PostCard key={post._id} post={post} dark={dark} />
        ))
      }
    </div>
  )
}
