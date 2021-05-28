import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { CardHeader, CardBody, CardFooter } from '@Components/Home'
import { LayoutContext } from '@Context/Layout'
import '@Components/Home/Posts/index.scss'

export const Posts = () => {
  const { dark } = useContext(LayoutContext)
  const { posts } = useSelector(state => state)

  return (
    <div className="posts-container">
      {
        posts.posts.map(post => (
          <div className={`post-card ${dark && 'dark'}`} key={post._id}>
            <CardHeader post={post} dark={dark} />
            <CardBody post={post} dark={dark} />
            <CardFooter post={post} dark={dark} />
          </div>
        ))
      }
    </div>
  )
}
