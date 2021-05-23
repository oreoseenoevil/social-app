import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import '@Components/Loading/index.scss'

export const Loading = () => {
  return (
    <div className="loading">
      <VscLoading className="loading-icon" />
    </div>
  )
}
