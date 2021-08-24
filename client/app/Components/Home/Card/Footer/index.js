import React, { useEffect, useState } from 'react'
import '@Components/Home/Card/Footer/index.scss'
import { FaRegComment, FaRegBookmark, FaBookmark } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { LikeButton } from '@Components/LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unlikePost, savedPost, unsavedPost } from '@Actions'
import { useHistory } from 'react-router'
import { ShareButton } from '@Components/Modal'
import { BASE_URL } from '@Utils'

export const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const history = useHistory()

  const [isShare, setIsShare] = useState(false)

  const [saved, setSaved] = useState(false)
  const [loadSaved, setLoadSaved] = useState(false)

  const { auth, socket } = useSelector(state => state)
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
      await dispatch(unlikePost({ post, auth, socket }))
    } else {
      await dispatch(likePost({ post, auth, socket }))
    }
    setLoadLike(false)
  }

  useEffect(() => {
    if (auth.user.saved.find(id => id === post._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, post._id])

  const handleSaved = async () => {
    if (loadSaved) return
    setSaved(!saved)
    setLoadSaved(true)
    if (saved) {
      await dispatch(unsavedPost({ post, auth }))
    } else {
      await dispatch(savedPost({ post, auth }))
    }
    setLoadSaved(false)
  }

  const IconBookmark = saved ? FaBookmark : FaRegBookmark

  return (
    <div className="card-footer">
      <div className="card-icons">
        <div className="group">
          <LikeButton size="1.5em" isLike={isLike} handleLike={handleLike} />
          <FaRegComment
            size="1.5em"
            onClick={() => history.push(`/post/${post._id}`)}
          />
          <FiSend size="1.5em" onClick={() => setIsShare(!isShare)} />
        </div>
        <IconBookmark
          size="1.5em"
          className="bookmark-icon"
          onClick={handleSaved}
        />
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
