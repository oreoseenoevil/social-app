import React, { useContext } from 'react'
import '@Components/LoadMore/index.scss'
import { LayoutContext } from '@Context/Layout'

export const LoadMore = ({ active, handleLoadMore }) => {
  const { dark } = useContext(LayoutContext)
  return (
    <span
      className={`load-more ${dark && 'dark'} ${active && 'active'}`}
      onClick={handleLoadMore}
    ></span>
  )
}
