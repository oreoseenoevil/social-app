import React, { useEffect, useState } from 'react'
import '@Components/Profile/Posts/index.scss'
import { PostThumb } from '@Components/PostThumb'

export const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    profile.posts.forEach(data => {
      if (data._id === id) {
        setPosts(data.data)
        setResult(data.result)
        setPage(data.page)
      }
    })
  }, [profile.posts, id])

  return (
    <div className="user-posts">
      <PostThumb posts={posts} result={result} />
    </div>
  )
}
