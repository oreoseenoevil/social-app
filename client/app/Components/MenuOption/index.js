import React, { Fragment, useContext } from 'react'
import { useComponentVisible } from '@Helpers'
import { GoKebabVertical } from 'react-icons/go'
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { LayoutContext } from '@Context/Layout'
import '@Components/MenuOption/index.scss'

export const MenuOption = ({ post, comment }) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const { dark } = useContext(LayoutContext)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  const MenuItem = () => {
    return (
      <Fragment>
        <div className="dropdown-item">
          <span>Edit Comment</span>
          <RiEditLine />
        </div>
        <span className={`dropdown-line ${dark && 'dark'}`}></span>
        <div className="dropdown-item">
          <span>Delete Comment</span>
          <RiDeleteBin6Line />
        </div>
      </Fragment>
    )
  }

  return (
    <div
      className="menu-option"
      ref={ref}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
    >
      <GoKebabVertical
        size="1em"
        className={isComponentVisible && 'active'}
      />
      {isComponentVisible &&
        <div className={`dropdown-menu ${dark && 'dark'}`}>
          {
            post.user._id === auth.user._id ?
              comment.user._id === auth.user._id ?
                MenuItem() :
                <div className="dropdown-item">
                  <span>Delete Comment</span>
                  <RiDeleteBin6Line />
                </div> :
              comment.user._id === auth.user._id && MenuItem()
          }
        </div>
      }
    </div>
  )
}
