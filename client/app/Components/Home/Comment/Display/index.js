import React, { Fragment, useEffect, useState } from 'react'
import { Avatar } from '@Components/Avatar'
import { LikeButton } from '@Components/LikeButton'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '@Components/Home/Comment/Display/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { MenuOption } from '@Components/MenuOption'

export const DisplayComment = ({ comment, post }) => {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)

  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleLike = async () => {
    if (loadLike) return
    setIsLike(!isLike)
    setLoadLike(true)
    // if (isLike) {
    //   await dispatch(unlikeComment({comment, post, auth}))
    // } else {
    //   await dispatch(likeComment({comment, post, auth}))
    // }
    setLoadLike(false)
  }

  useEffect(() => {
    setContent(comment.content)
  }, [comment])

  return (
    <div className="comment-display">
      <Link
        to={`/profile/${comment.user._id}`} className="comment-info"
      >
        <Avatar src={comment.user.avatar} size="common" />
      </Link>
      <div className="comment-content">
        <span className="row">
          <span className="content-group">
            <Link
              to={`/profile/${comment.user._id}`}
            >
              {comment.user.fullname}
            </Link> {
              content.length < 100 ? content :
                readMore ? content + ' ' : content.slice(0, 100) + '...'
            } {
              content.length > 100 &&
                <span
                  className="read-more"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? 'less' : 'more'}
                </span>
            }
          </span>
          <span className="menu-icons">
            {
              (post.user._id === auth.user._id ||
                comment.user._id === auth.user._id) &&
                <MenuOption post={post} comment={comment} />
            }
            <LikeButton
              size="1em"
              isLike={isLike}
              handleLike={handleLike}
            />
          </span>
        </span>
        <span className="group">
          {
            comment._id ?
              <Fragment>
                <span>
                  {moment(comment.createdAt).fromNow(true)}
                </span>
                <button>
                  {comment.likes.length > 0 ?
                    comment.likes.length : null} like{comment.likes.length > 1 && 's'}
                </button>
                <button>reply</button>
              </Fragment> :
              <span className="comment-loading">
                loading...
              </span>
          }
        </span>
      </div>
    </div>
  )
}
