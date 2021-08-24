import React, { useState } from 'react'
import '@Components/Home/Comment/Input/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '@Actions'
import { TextareaAutosize } from '@material-ui/core'

export const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('')

  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false)
      return
    }

    setContent('')

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user
    }
    dispatch(createComment({ post, newComment, auth, socket }))

    if (setOnReply) return setOnReply(false)
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      {children}
      <TextareaAutosize
        rowsMax={5}
        placeholder={onReply ? 'Reply a comment...' : 'Add a comment...'}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit" disabled={!content ? true : false}>
        Post
      </button>
    </form>
  )
}
