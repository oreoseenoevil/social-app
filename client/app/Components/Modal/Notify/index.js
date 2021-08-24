import React, { Fragment } from 'react'
import '@Components/Modal/Notify/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@Components/Avatar'
import { isReadNotify } from '@Actions'
import moment from 'moment'

export const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRead = data => {
    history.push(`${data.url}`)
    dispatch(isReadNotify({ data, auth }))
  }

  return (
    <Fragment>
      {notify.data.map((data, index) => (
        <div
          className={`notify-container ${data.isRead && 'read'}`}
          key={index}
        >
          <span onClick={() => handleRead(data)} className="notify-content">
            <Avatar src={data.user.avatar} size="medium" />
            <div className="notify-info">
              <span className="group">
                <span className="username">{data.user.username}</span>
                <span>{data.text}</span>
              </span>
              {data.content && (
                <span className="content">{data.content.slice(0, 20)}...</span>
              )}
              <span className="time">{moment(data.createdAt).fromNow()}</span>
            </div>
            {data.image && (
              <div className="image-container">
                <Avatar src={data.image} size="medium square" />
              </div>
            )}
          </span>
        </div>
      ))}
    </Fragment>
  )
}
