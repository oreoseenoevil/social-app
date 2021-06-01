import React, { useContext } from 'react'
import '@Components/PostThumb/index.scss'
import { Link } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { LayoutContext } from '@Context/Layout'

export const PostThumb = ({ posts }) => {
  const { dark } = useContext(LayoutContext)

  return (
    <div className="post-thumb">
      {
        posts.map(post => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <Carousel
              animation="fade"
              navButtonsAlwaysInvisible={true}
              indicators={false}
              timeout={1000}
            >
              {
                post.images.length > 0 ?
                  post.images.map((image, i) => (
                    <div className="thumbnails" key={i}>
                      <img src={image.url} alt="image" />
                    </div>
                  )) :
                  <div className={`thumbnails-content ${dark && 'dark'}`}>
                    {post.content}
                  </div>
              }
            </Carousel>
          </Link>
        ))
      }
    </div>
  )
}
