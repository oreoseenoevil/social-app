import React, { Fragment, useEffect, useState } from 'react'
import { DisplayComment } from '@Components/Home'

export const CommentCard = ({ comment, post, replyComment }) => {
  const [showReply, setShowReply] = useState([])
  const [next, setNext] = useState(1)

  useEffect(() => {
    setShowReply(replyComment.slice(replyComment.length - next))
  }, [replyComment, next])

  return (
    <Fragment>
      <DisplayComment comment={comment} post={post} commentId={comment._id}>
        <Fragment>
          {showReply.map(
            (item, index) =>
              item.reply && (
                <DisplayComment
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          {replyComment.length - next > 0 ? (
            <span className="show-comments" onClick={() => setNext(next + 10)}>
              See more comments
            </span>
          ) : (
            replyComment.length > 1 && (
              <span className="show-comments" onClick={() => setNext(1)}>
                Hide comments
              </span>
            )
          )}
        </Fragment>
      </DisplayComment>
    </Fragment>
  )
}
