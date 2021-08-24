import React from 'react'
import { FiHeart } from 'react-icons/fi'
import '@Components/LikeButton/index.scss'

export const LikeButton = ({ size, isLike, handleLike }) => {
  return (
    <FiHeart
      size={size}
      className={`heart-icon ${isLike && 'active'}`}
      onClick={handleLike}
    />
  )
}
