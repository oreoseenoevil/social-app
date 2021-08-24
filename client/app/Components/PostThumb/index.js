import React, { useContext } from 'react'
import '@Components/PostThumb/index.scss'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { LayoutContext } from '@Context/Layout'
import { FiHeart } from 'react-icons/fi'
import { ImBubble } from 'react-icons/im'

export const PostThumb = ({ posts, result }) => {
  const { dark } = useContext(LayoutContext)

  if (result === 0) return <h2>No Post</h2>

  return (
    <div className="post-thumb">
      {posts.map(post => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <Carousel
            animation="fade"
            navButtonsAlwaysInvisible={true}
            indicators={false}
            timeout={1000}
          >
            {post.images.length > 0 ? (
              post.images.map((image, i) => (
                <div className="thumbnails" key={i}>
                  <img src={image.url} alt="image" />
                </div>
              ))
            ) : (
              <div className={`thumbnails-content ${dark && 'dark'}`}>
                {post.content}
              </div>
            )}
          </Carousel>
          <div className="thumb-icons">
            <span>
              <FiHeart /> {post.likes.length}
            </span>
            <span>
              <ImBubble /> {post.comments.length}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
