import React, { Fragment, useEffect, useState } from 'react'
import { Avatar } from '@Components/Avatar'
import { LikeButton } from '@Components/LikeButton'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '@Components/Home/Comment/Display/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { MenuOption } from '@Components/MenuOption'
import { EditComment, InputComment } from '@Components/Home'
import { updateComment, TYPES, likeComment, unlikeComment } from '@Actions'

export const DisplayComment = ({ children, comment, post, commentId }) => {
  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)
  const [onEdit, setOnEdit] = useState(false)

  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const [onReply, setOnReply] = useState(false)

  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  const { MODAL } = TYPES

  const handleLike = async () => {
    if (loadLike) return
    setIsLike(!isLike)
    setLoadLike(true)
    if (isLike) {
      await dispatch(unlikeComment({ comment, post, auth, socket }))
    } else {
      await dispatch(likeComment({ comment, post, auth, socket }))
    }
    setLoadLike(false)
  }

  useEffect(() => {
    setContent(comment.content)
    setIsLike(false)
    setOnReply(false)
    if (comment.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    }
  }, [comment, auth.user._id])

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }))
      setOnEdit(false)
      dispatch({ type: MODAL, payload: false })
    } else {
      setOnEdit(false)
      dispatch({ type: MODAL, payload: false })
    }
  }

  const cancelUpdate = () => {
    setOnEdit(false)
    dispatch({ type: MODAL, payload: false })
  }

  const handleReply = () => {
    if (onReply) {
      return setOnReply(false)
    }
    setOnReply({ ...comment, commentId })
  }

  return (
    <div className="comment-display">
      <Link to={`/profile/${comment.user._id}`} className="comment-info">
        <Avatar src={comment.user.avatar} size="common" />
      </Link>
      <div className="comment-content">
        <span className="row">
          <pre>
            <Link to={`/profile/${comment.user._id}`}>
              {comment.user.fullname}
            </Link>{' '}
            {
              <Fragment>
                {comment.tag && comment.tag._id !== comment.user._id && (
                  <Link
                    style={{ color: '#0984e3' }}
                    to={`/profile/${comment.tag._id}`}
                  >
                    {comment.tag.fullname}
                  </Link>
                )}{' '}
                {content.length < 100
                  ? content
                  : readMore
                    ? content + ' '
                    : content.slice(0, 100) + '...'}{' '}
                {content.length > 100 && (
                  <span
                    className="read-more"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? 'less' : 'more'}
                  </span>
                )}
              </Fragment>
            }
          </pre>
          <span className="menu-icons">
            {(post.user._id === auth.user._id ||
              comment.user._id === auth.user._id) && (
              <MenuOption post={post} comment={comment} setOnEdit={setOnEdit} />
            )}
            <LikeButton size="1em" isLike={isLike} handleLike={handleLike} />
          </span>
        </span>
        <span className="group">
          {comment._id ? (
            <Fragment>
              <span>{moment(comment.createdAt).fromNow(true)}</span>
              {comment.likes.length > 0 ? (
                <button>
                  {comment.likes.length} like{comment.likes.length > 1 && 's'}
                </button>
              ) : null}
              <button onClick={handleReply}>
                {onReply ? 'cancel' : 'reply'}
              </button>
            </Fragment>
          ) : (
            <span className="comment-loading">loading...</span>
          )}
        </span>
        {onReply && (
          <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
            <Link to={`profile/${auth.user._id}`}>
              <Avatar src={auth.user.avatar} size="common" />
            </Link>
          </InputComment>
        )}
        {children}
      </div>
      {onEdit && (
        <EditComment
          onEdit={onEdit}
          comment={comment}
          content={content}
          setContent={setContent}
          cancelUpdate={cancelUpdate}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}
