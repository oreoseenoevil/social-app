import React, { useState, useRef, Fragment, useEffect } from 'react'
import '@Components/Modal/Status/index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TYPES, createPost, updatePost } from '@Actions'
import { FaCamera, FaImage } from 'react-icons/fa'

export const StatusModal = ({ dark }) => {
  const dispatch = useDispatch()
  const { auth, status, socket } = useSelector(state => state)

  const { STATUS, ALERT } = TYPES

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [stream, setStream] = useState(false)
  const [tracks, setTracks] = useState('')
  const [loading, setLoading] = useState(false)

  const videoRef = useRef()
  const refCanvas = useRef()

  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err
    let newImages = []

    files.forEach(file => {
      if (!file) return (err = 'File doesn\'t exist.')
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'File format is incorrect.')
      }

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.')
      }

      return newImages.push(file)
    })

    if (err) {
      dispatch({
        type: ALERT,
        payload: { error: err },
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
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
          const track = mediaStream.getTracks()
          setTracks(track[0])
        })
        .catch(err => {
          console.log(err)
          setStream(false)
        })
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    refCanvas.current.height = height
    refCanvas.current.width = width

    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([...images, { camera: URL }])
  }

  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    if (!content && images.length === 0) {
      return dispatch({
        type: ALERT,
        payload: {
          error: 'Please add content or photo.',
        },
      })
    }

    if (status.onEdit) {
      await dispatch(updatePost({ content, images, auth, status }))
    } else {
      await dispatch(createPost({ content, images, auth, socket }))
    }

    setContent('')
    setImages([])
    if (tracks) tracks.stop()
    dispatch({
      type: STATUS,
      payload: false,
    })
    setLoading(false)
  }

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
    }

    return () => {
      setContent('')
      setImages([])
    }
  }, [status])

  return (
    <div className="modal-container">
      <form className={`${dark && 'dark'}`} onSubmit={handleSubmit}>
        <div className={`modal-header ${dark && 'dark'}`}>
          <h3>{status.onEdit ? 'Edit Post' : 'Create Post'}</h3>
          <span
            className={`close x-marked ${dark && 'dark'}`}
            onClick={() => dispatch({ type: STATUS, payload: false })}
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
            {images.map((img, index) => (
              <div className="image" key={index}>
                <img
                  src={
                    img.camera
                      ? img.camera
                      : img.url
                        ? img.url
                        : URL.createObjectURL(img)
                  }
                  alt="images"
                />
                <span
                  className="close x-marked"
                  onClick={() => deleteImage(index)}
                ></span>
              </div>
            ))}
          </div>

          {stream && (
            <div className={`stream ${dark && 'dark'}`}>
              <video autoPlay muted ref={videoRef} width="100%" height="100%" />
              <span
                className={`close x-marked ${dark && 'dark'}`}
                onClick={handleStopStream}
              ></span>
              <canvas ref={refCanvas} style={{ display: 'none' }} />
            </div>
          )}

          <div className="input-images">
            {stream ? (
              <FaCamera size="2em" onClick={handleCapture} />
            ) : (
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
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button
            className={`btn-info ${dark && 'dark'}`}
            type="submit"
            disabled={
              (!content && images.length === 0) || loading ? true : false
            }
          >
            {status.onEdit
              ? loading
                ? 'Saving'
                : 'Save'
              : loading
                ? ' Posting'
                : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}
