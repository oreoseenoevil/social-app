import React, { useState, useRef, Fragment } from 'react'
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
  const [stream, setStream] = useState(false)
  const [tracks, setTracks] = useState('')

  const videoRef = useRef()
  const canvasRef = useRef()

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

  const handleStream = () => {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
          const track = mediaStream.getTracks()
          setTracks(track[0])
        }).catch(err => {
          if (err) {
            setStream(false)
          }
        })
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    canvasRef.current.setAttribute('width', width)
    canvasRef.current.setAtrribute('height', height)

    const ctx = canvasRef.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = canvasRef.current.toDataURL()
    setImages([...images, { camera: URL }])
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
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
                  <img src={img.camera ? img.camera : URL.createObjectURL(img)} alt="images" />
                  <span
                    className="close x-marked"
                    onClick={() => deleteImage(index)}
                  ></span>
                </div>
              ))
            }
          </div>

          {
            stream &&
              <div className={`stream ${dark && 'dark'}`}>
                <video
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />
                <span
                  className={`close x-marked ${dark && 'dark'}`}
                  onClick={handleStopStream}
                ></span>
                <canvas
                  ref={canvasRef}
                  style={{ display: 'none' }}
                />
              </div>
          }

          <div className="input-images">
            {
              stream ?
                <FaCamera size="2em" onClick={handleCapture} /> :
                <Fragment>
                  <FaCamera size="2em" onClick={handleStream} />
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
                </Fragment>
            }
          </div>
        </div>
        <div className="modal-footer">
          <button className={`btn-info ${dark && 'dark'}`}>Post</button>
        </div>
      </form>
    </div>
  )
}
