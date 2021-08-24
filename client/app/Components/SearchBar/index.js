import React, { useState, useEffect, createRef, useRef } from 'react'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import '@Components/SearchBar/index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '@Helpers'
import { TYPES } from '@Actions'
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

  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClose()
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  return (
    <div className="search-bar" onClick={textAreaFocus} ref={wrapperRef}>
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          ref={userInputRef}
          name="search"
          value={search}
          placeholder="Search"
          className={search && 'searching'}
          onChange={e =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
          }
        />
        {!search ? (
          <div className="search-icon">
            <RiSearchLine className={`icon-search ${dark && 'dark'}`} />
          </div>
        ) : (
          <div className="close-search" onClick={handleClose}>
            <RiCloseLine className={`close ${dark && 'dark'}`} />
          </div>
        )}
      </form>
      {search && (
        <div className={`users-result ${dark && 'dark'}`}>
          {users.length === 0 ? (
            <span className="no-result">No results found.</span>
          ) : (
            <div className={`result-container ${dark && 'dark'}`}>
              {users.map(user => (
                <div className="results" key={user._id}>
                  <UserCard user={user} handleClose={handleClose} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
