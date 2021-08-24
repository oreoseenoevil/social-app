import React from 'react'
import {
  CardHeader,
  CardBody,
  CardFooter,
  OutputComment,
  InputComment
} from '@Components/Home'
import '@Components/Home/PostCard/index.scss'

export const PostCard = ({ post, dark }) => {
  return (
    <div className={`post-card ${dark && 'dark'}`}>
      <CardHeader post={post} dark={dark} />
      <CardBody post={post} dark={dark} />
      <CardFooter post={post} dark={dark} />
      <OutputComment post={post} />
      <InputComment post={post} />
    </div>
  )
}
