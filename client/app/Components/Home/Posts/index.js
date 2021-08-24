import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostCard } from '@Components/Home'
import { LayoutContext } from '@Context/Layout'
import '@Components/Home/Posts/index.scss'
import { LoadMore } from '@Components/LoadMore'
import { getDataAPI } from '@Helpers'
import { POST_TYPES } from '@Actions'

export const Posts = () => {
  const { dark } = useContext(LayoutContext)
  const { auth, posts } = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  const { GET_POSTS } = POST_TYPES
  const { result, page } = posts

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`/posts?limit=${page * 9}`, auth.token)
    dispatch({
      type: GET_POSTS,
      payload: { ...res.data, page: page + 1 }
    })
    setLoad(false)
  }

  return (
    <div className="posts-container">
      {posts.posts.map(post => (
        <PostCard key={post._id} post={post} dark={dark} />
      ))}

      {result < 9 * (page - 1) ? null : (
        <LoadMore active={load} handleLoadMore={handleLoadMore} />
      )}
    </div>
  )
}
