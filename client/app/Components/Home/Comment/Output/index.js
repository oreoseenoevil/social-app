import React from 'react'
import '@Components/Home/Comment/Output/index.scss'
import { DisplayComment } from '@Components/Home'

export const OutputComment = ({ post }) => {
  return (
    <div className="comment-output">
      {
        post.comments.map((comment, index) => (
          <DisplayComment
            key={index}
            comment={comment}
            post={post}
          />
        ))
      }
    </div>
  )
}

