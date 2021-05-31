import React, { useEffect, useState } from 'react'
import '@Components/Home/Comment/Output/index.scss'
import { DisplayComment } from '@Components/Home'

export const OutputComment = ({ post }) => {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])
  const [next, setNext] = useState(0)

  useEffect(() => {
    const newComment = post.comments.filter(comment => !comment.reply)
    setComments(newComment)
    setShowComments(newComment.slice(newComment.length - next))
  }, [post.comments, next])

  return (
    <div className="comment-output">
      {
        showComments.map((comment, index) => (
          <DisplayComment
            key={index}
            comment={comment}
            post={post}
          />
        ))
      }
      {
        comments.length - next > 0 ?
          <span
            className="show-comments"
            onClick={() => setNext(next + post.comments.length)}
          >
            {
              post.comments.length > 1 ?
              `View all ${post.comments.length} comments` :
              `View ${post.comments.length} comment`
            }
          </span> :
          comments.length > 0 &&
            <span
              className="show-comments"
              onClick={() => setNext(0)}
            >
              Hide comments
            </span>
      }
    </div>
  )
}

