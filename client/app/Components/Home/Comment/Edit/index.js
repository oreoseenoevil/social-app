import React, { useContext, useEffect } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import '@Components/Home/Comment/Edit/index.scss'
import { LayoutContext } from '@Context/Layout'
import { TYPES } from '@Actions'
import { useDispatch } from 'react-redux'

export const EditComment = ({
  comment,
  content,
  setContent,
  cancelUpdate,
  handleUpdate,
  onEdit
}) => {
  const { dark } = useContext(LayoutContext)
  const dispatch = useDispatch()
  const { MODAL } = TYPES

  useEffect(() => {
    if (onEdit) {
      dispatch({ type: MODAL, payload: true })
    } else {
      dispatch({ type: MODAL, payload: false })
    }
  }, [onEdit, dispatch])

  return (
    <div className="edit-container">
      <div className={`edit-content ${dark && 'dark'}`}>
        <h3>Edit Comment</h3>
        <TextareaAutosize
          rowsMin={3}
          rowsMax={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className={`button-group ${dark && 'dark'}`}>
          <button onClick={cancelUpdate} className="btn-cancel">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="btn-update"
            disabled={comment.content === content ? true : false}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
