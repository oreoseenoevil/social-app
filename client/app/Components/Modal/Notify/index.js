import React, { Fragment } from 'react'
import '@Components/Modal/Notify/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@Components/Avatar'


export const NotifyModal = () => {
  const { auth, notify } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()
  
  return (
    <Fragment>
      {
        notify.data.map((data, index ) => (
          <div className="notify-container" key={index}>
            <span
              onClick={() => history.push(`${data.url}`)}
              className="notify-content">
              <Avatar src={data.user.avatar} size="medium" />
              <div className="notify-info">
                <span className="username">{data.user.username}</span>
                {data.content &&
                  <span className="content">
                    {data.content.slice(0, 20)}...
                  </span>}
              </div>
              {
                data.image &&
                  <div className="image-container">
                    <Avatar src={data.image} size="medium" />
                  </div>
              }
            </span>
          </div>
        ))
      }
    </Fragment>
  )
}
