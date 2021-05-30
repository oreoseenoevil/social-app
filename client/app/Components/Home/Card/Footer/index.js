import React, { useEffect, useState } from 'react'
import '@Components/Home/Card/Footer/index.scss'
import { BiMessageRounded } from 'react-icons/bi'
import { FiSend, FiHeart } from 'react-icons/fi'
import { BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unlikePost } from '@Actions'

export const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return
    setIsLike(!isLike)
    setLoadLike(true)
    if (isLike) {
      await dispatch(unlikePost({post, auth}))
    } else {
      await dispatch(likePost({post, auth}))
    }
    setLoadLike(false)
  }

  return (
    <div className="card-footer">
      <div className="card-container">
        <span className="likes">
          {post.likes.length} like{post.likes.length > 1 && 's'}
        </span>
        <span className="comments">
          {post.comments.length} comment{post.comments.length > 1 && 's'}
        </span>
      </div>
      <div className="card-icons">
        <div className="group">
          <FiHeart
            size="1.5em"
            className={isLike && 'active'}
            onClick={handleLike}
          />
          <BiMessageRounded size="1.5em" />
          <FiSend size="1.5em" />
        </div>
        <BsBookmark size="1.5em" />
      </div>
    </div>
  )
}
