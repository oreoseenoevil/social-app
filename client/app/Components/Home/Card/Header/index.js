import React, { Fragment } from 'react'
import { Avatar } from '@Components/Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import '@Components/Home/Card/Header/index.scss'
import { GoKebabVertical } from 'react-icons/go'
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri'
import { BsLink45Deg } from 'react-icons/bs'
import { useComponentVisible } from '@Helpers'
import { TYPES, deletePost } from '@Actions'
import { BASE_URL } from '@Utils'

export const CardHeader = ({ post, dark }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)

  const history = useHistory()

  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()
  const { STATUS } = TYPES

  const handleEditPost = () => {
    dispatch({
      type: STATUS,
      payload: {
        ...post,
        onEdit: true
      }
    })
  }

  const handleDeletePost = () => {
    dispatch(deletePost({ post, auth, socket }))
    return history.push('/')
  }

  const handeCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
  }

  return (
    <div className="card-header">
      <div className="group">
        <Avatar src={post.user.avatar} size="medium" />
        <div className="card-name">
          <h4>
            <Link to={`/profile/${post.user._id}`}>{post.user.fullname}</Link>
          </h4>
          <span>{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      <div
        className="nav-item"
        ref={ref}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <GoKebabVertical
          size="1.5em"
          className={isComponentVisible && 'active'}
        />
        {isComponentVisible && (
          <div className={`dropdown-menu ${dark && 'dark'}`}>
            {auth.user._id === post.user._id && (
              <Fragment>
                <div className="dropdown-item" onClick={handleEditPost}>
                  <span>Edit Post</span>
                  <RiEditLine />
                </div>
                <span className={`dropdown-line ${dark && 'dark'}`}></span>
                <div className="dropdown-item" onClick={handleDeletePost}>
                  <span>Delete Post</span>
                  <RiDeleteBin6Line />
                </div>
              </Fragment>
            )}
            {auth.user._id === post.user._id && (
              <span className={`dropdown-line ${dark && 'dark'}`}></span>
            )}
            <div className="dropdown-item" onClick={handeCopyLink}>
              <span>Copy Link</span>
              <BsLink45Deg />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
