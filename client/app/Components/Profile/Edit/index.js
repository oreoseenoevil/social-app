import React, { useState } from 'react'

const initialState = {
  fullname: '',
  mobile: '',
  address: '',
  website: '',
  story: '',
  gender: ''
}

export const Edit = ({ user, setOnEdit }) => {

  const [userData, setuserData] = useState(initialState)

  const { fullname, mobile, address, website, story, gender } = userData

  const [avatar, setAvatar] = useState('')

  return (
    <div className="edit-profile">
      <button
        className="btn-red"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
    </div>
  )
}
