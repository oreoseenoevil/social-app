import React, { useState } from 'react'
import '@Components/Home/Card/Body/index.scss'
import Carousel from 'react-material-ui-carousel'
import { Slider } from '@Components/Home'
import { AiOutlineLine } from 'react-icons/ai'

export const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <div className="card-body">
      <div className="card-body-content">
        <span className="content-text">
          {post.content.length < 60
            ? post.content
            : readMore
              ? post.content + ' '
              : post.content.slice(0, 60) + '... '}
          {post.content.length > 60 && (
            <span className="readMore" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'less' : 'more'}
            </span>
          )}
        </span>
        <Carousel
          autoPlay={false}
          animation="slide"
          navButtonsAlwaysInvisible={post.images.length > 1 ? false : true}
          indicators={post.images.length > 1 ? true : false}
          IndicatorIcon={<AiOutlineLine size="2em" />}
          indicatorContainerProps={{
            style: {
              margin: 0,
              position: 'absolute',
              bottom: '1rem'
            }
          }}
        >
          {post.images.length > 0 &&
            post.images.map((image, i) => <Slider image={image} key={i} />)}
        </Carousel>
      </div>
    </div>
  )
}
