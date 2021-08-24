import React from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

export const ShareButton = ({ url }) => {
  console.log(url)

  const styleShare = {
    display: 'flex',
    width: '100%',
    padding: '0.5em',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  return (
    <div style={styleShare}>
      <FacebookShareButton url={url}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round size={32} />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon round size={32} />
      </EmailShareButton>
      <RedditShareButton url={url}>
        <RedditIcon round size={32} />
      </RedditShareButton>
    </div>
  )
}
