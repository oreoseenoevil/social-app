import React from 'react'
import '@Components/Home/Slider/index.scss'

export const Slider = ({ image }) => {
  return (
    <div className="slider-container">
      <img className="slider-image" src={image.url} alt="image" />
    </div>
  )
}
