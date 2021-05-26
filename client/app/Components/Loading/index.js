import React, { useContext } from 'react'
import { VscLoading } from 'react-icons/vsc'
import '@Components/Loading/index.scss'
import { LayoutContext } from '@Context/Layout'

export const Loading = () => {
  const { dark } = useContext(LayoutContext)

  return (
    <div className={`loading ${dark && 'dark'}`}>
      <VscLoading className={`loading-icon ${dark && 'dark'}`} />
    </div>
  )
}
