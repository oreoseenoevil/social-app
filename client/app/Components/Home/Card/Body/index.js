import React, { useState } from 'react'
import '@Components/Home/Card/Body/index.scss'
import Carousel from 'react-material-ui-carousel'
import { Slider } from '@Components/Home'

export const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <div className="card-body">
      <div className="card-body-content">
        <span>
          {
            post.content.length < 60 ?
              post.content : 
              readMore ? post.content + ' ' : post.content.slice(0, 60) + '...'
          }
          {
            post.content.length > 60 &&
              <span className="readMore" onClick={() => setReadMore(!readMore)}>
                {readMore ? 'Hide content' : 'Read More'}
              </span>
          }
        </span>
        <Carousel>
          {
            post.images.length > 0 &&
              post.images.map((image, i) => (
                <Slider image={image} key={i} />
              ))
          }
        </Carousel>
      </div>
    </div>
  )
}
