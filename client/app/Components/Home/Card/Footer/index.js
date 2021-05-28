import React from 'react'
import '@Components/Home/Card/Footer/index.scss'
import { BiMessageRounded } from 'react-icons/bi'
import { FiSend, FiHeart } from 'react-icons/fi'
import { BsBookmark } from 'react-icons/bs'

export const CardFooter = ({ post }) => {
  return (
    <div className="card-footer">
      <div className="card-container">
        <span className="likes">
          {post.likes.length} like{post.likes.length > 1 && 's'}
        </span>
        <span className="comments">
          {post.comments.length} comment{post.comments.length > 1 && 's'}
        </span>
      </div>
      <div className="card-icons">
        <div className="group">
          <FiHeart size="1.5em" className="heart" />
          <BiMessageRounded size="1.5em" />
          <FiSend size="1.5em" />
        </div>
        <BsBookmark size="1.5em" />
      </div>
    </div>
  )
}
