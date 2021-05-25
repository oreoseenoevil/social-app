import React, { useState, useEffect, createRef } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import '@Components/SearchBar/index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '@Helpers/fetchData'
import { TYPES } from '@Actions/global'
import { Link } from 'react-router-dom'
import { UserCard } from '@Components/UserCard'

export const SearchBar = ({ dark }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const userInputRef = createRef()
  const textAreaFocus = () => userInputRef.current.focus()

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!search) return
    if (search) {
      getDataAPI(`/user/search?username=${search}`, auth.token)
        .then(res => setUsers(res.data.data))
        .catch(err => {
          dispatch({
            type: TYPES.ALERT,
            payload: {
              error: {
                error: err.response.data.error
              }
            }
          })
        })
    }
  }, [search, auth.token, dispatch])

  const handleClose = () => {
    setSearch('')
    setUsers([])
  }

  return (
    <div className="search-bar" onClick={textAreaFocus}>
      <form className="search-form">
        <input
          type="text"
          ref={userInputRef}
          name="search"
          value={search}
          placeholder="Search"
          className={search && 'searching'}
          onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
        />
        {
          !search ? <div className="search-icon">
            <RiSearchLine className={`icon-search ${dark && 'dark'}`} />
          </div> :
            <div  
              className="close-search"
              onClick={handleClose}
            >
              <RiCloseLine
                className={`close ${dark && 'dark'}`} 
              />
            </div>
        }
        <div className="users-result">
          {
            search && users.map(user => (
              <Link key={user._id} to={`/profile/${user._id}`} onClick={handleClose}>
                <UserCard user={user} />
              </Link>
            ))
          }
        </div>
      </form>
    </div>
  )
}
