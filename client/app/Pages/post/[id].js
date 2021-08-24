import React, { useContext, useEffect, useState } from 'react'
import '@Pages/post/index.scss'
import { useParams } from 'react-router'
import { PostCard } from '@Components/Home'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '@Actions'
import { VscLoading } from 'react-icons/vsc'
import { LayoutContext } from '@Context/Layout'

const Post = () => {
  const { dark } = useContext(LayoutContext)
  const { id } = useParams()
  const [post, setPost] = useState([])

  const { auth, detailPost } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }))

    if (detailPost.length > 0) {
      const newArr = detailPost.filter(post => post._id === id)
      setPost(newArr)
    }
  }, [detailPost, dispatch, id, auth])

  return (
    <div className="posts">
      {post.length === 0 && (
        <VscLoading size="3em" className="loading-profile" />
      )}
      {post.map(item => (
        <PostCard key={item._id} post={item} dark={dark} />
      ))}
    </div>
  )
}

export default Post
