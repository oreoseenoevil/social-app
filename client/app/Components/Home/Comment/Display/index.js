import React from 'react'
import { Avatar } from '@Components/Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import '@Components/Home/Comment/Display/index.scss'

export const DisplayComment = ({ comment }) => {
  return (
    <div className="comment-display">
      <div className="comment-content">
        <Link
          to={`/profile/${comment.user._id}`} className="comment-info"
        >
          <Avatar src={comment.user.avatar} size="common" />
          <span>
            <h5>{comment.user.fullname}</h5>
          </span>
        </Link>
        <span>{comment.content}</span>
      </div>
      <span className="comment-row">
        <span>
          {moment(comment.createdAt).fromNow()}
        </span>
        <button>like</button>
        <button>reply</button>
      </span>
    </div>
  )
}
