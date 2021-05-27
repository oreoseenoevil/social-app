import React, { useState } from 'react'
import '@Components/Modal/Status/index.scss'
import { useSelector, useDispatch} from 'react-redux'
import { TYPES } from '@Actions'
import { FaCamera, FaImage } from 'react-icons/fa'

export const StatusModal = ({ dark }) => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  const { STATUS, ALERT } = TYPES

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])

  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err
    let newImages = []

    files.forEach(file => {
      if (!file) return err = 'File doesn\'t exist.'
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return err = 'File format is incorrect.'
      }

      if (file.size > 1024 * 1024 * 5) {
        return err = 'The image/video largest is 5mb.'
      }

      return newImages.push(file)
    })

    if (err) {
      dispatch({
        type: ALERT,
        payload: { error: err}
      })
    }
    setImages([...images, ...newImages])
  }

  const deleteImage = index => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  return (
    <div className="modal-container">
      <form className={`${dark && 'dark'}`}>
        <div className={`modal-header ${dark && 'dark'}`}>
          <h3>Create Post</h3>
          <span
            className={`close x-marked ${dark && 'dark'}`}
            onClick={() => dispatch({type: STATUS, payload: false}) }
          ></span>
        </div>

        <div className="modal-body">
          <textarea
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`${auth.user.username}, What's on your mind?`}
          />
          <div className="show-images">
            {
              images.map((img, index) => (
                <div className="image" key={index}>
                  <img src={URL.createObjectURL(img)} alt="images" />
                  <span
                    className="close x-marked"
                    onClick={() => deleteImage(index)}
                  ></span>
                </div>
              ))
            }
          </div>

          <div className="input-images">
            <FaCamera size="2em" />
            <div className="file-upload">
              <FaImage size="2em" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleChangeImages}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className={`btn-info ${dark && 'dark'}`}>Posts</button>
        </div>
      </form>
    </div>
  )
}
