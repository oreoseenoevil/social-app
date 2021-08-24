import React, { useEffect, useState } from 'react'
import '@Components/Home/Comment/Output/index.scss'
import { CommentCard } from '@Components/Home'

export const OutputComment = ({ post }) => {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])
  const [next, setNext] = useState(0)

  const [replyComments, setReplyComments] = useState([])

  useEffect(() => {
    const newComment = post.comments.filter(comment => !comment.reply)
    setComments(newComment)
    setShowComments(newComment.slice(newComment.length - next))
  }, [post.comments, next])

  useEffect(() => {
    const newReply = post.comments.filter(comment => comment.reply)
    setReplyComments(newReply)
  }, [post.comments])

  return (
    <div className="comment-output">
      {comments.length - next > 0 ? (
        <span
          className="show-comments"
          onClick={() => setNext(next + post.comments.length)}
        >
          {post.comments.length > 1
            ? `View all ${post.comments.length} comments`
            : `View ${post.comments.length} comment`}
        </span>
      ) : (
        comments.length > 0 && (
          <span className="show-comments" onClick={() => setNext(0)}>
            Hide comments
          </span>
        )
      )}
      {showComments.map((comment, index) => (
        <CommentCard
          key={index}
          comment={comment}
          post={post}
          replyComment={replyComments.filter(
            item => item.reply === comment._id
          )}
        />
      ))}
    </div>
  )
}
