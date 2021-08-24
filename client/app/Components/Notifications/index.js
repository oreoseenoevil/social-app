import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '@Components/Loading'
import '@Components/Notifications/index.scss'
import { Toast } from '@Components/Toast'
import { TYPES } from '@Actions'

export const Notification = () => {
  const { alert, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  const { ALERT } = TYPES

  return (
    <div className="notification">
      {alert.loading && <Loading />}
      {profile.loading && <Loading />}

      {alert.success && (
        <Toast
          success={alert.success}
          handleClose={() =>
            dispatch({
              type: ALERT,
              payload: {}
            })
          }
        />
      )}

      {alert.error && (
        <Toast
          error={alert.error}
          handleClose={() =>
            dispatch({
              type: ALERT,
              payload: {}
            })
          }
        />
      )}
    </div>
  )
}
