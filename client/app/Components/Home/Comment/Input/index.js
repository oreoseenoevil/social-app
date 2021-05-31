import React, { useState } from 'react'
import '@Components/Home/Comment/Input/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '@Actions'
import { TextareaAutosize } from '@material-ui/core'

export const InputComment = ({ post }) => {
  const [content, setContent] = useState('')

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!content.trim()) return

    setContent('')

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString()
    }
    dispatch(createComment({post, newComment, auth}))
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <TextareaAutosize
        rowsMax={5}
        placeholder="Add a comment..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  )
}
