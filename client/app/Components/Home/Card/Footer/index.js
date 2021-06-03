import React, { useEffect, useState } from 'react'
import '@Components/Home/Card/Footer/index.scss'
import { FaRegComment } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { LikeButton } from '@Components/LikeButton'
import { BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unlikePost } from '@Actions'
import { useHistory } from 'react-router'
import { ShareButton } from '@Components/Modal'
import { BASE_URL } from '@Utils'

export const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const history = useHistory()

  const [isShare, setIsShare] = useState(false)

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
      <div className="card-icons">
        <div className="group">
          <LikeButton
            size="1.5em"
            isLike={isLike}
            handleLike={handleLike}
          />
          <FaRegComment size="1.5em"
            onClick={() => history.push(`/post/${post._id}`)}
          />
          <FiSend size="1.5em"
            onClick={() => setIsShare(!isShare)}
          />
        </div>
        <BsBookmark size="1.5em" />
      </div>
      {isShare && <ShareButton url={`${BASE_URL}/post/${post._id}`} />}
      <div className="card-container">
        <span className="likes">
          {post.likes.length} like{post.likes.length > 1 && 's'}
        </span>
      </div>
    </div>
  )
}
